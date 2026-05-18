import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, type JwtSignOptions } from '@nestjs/jwt';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { username: dto.username },
      include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
    });
    if (!user || !(await bcrypt.compare(dto.password, user.passwordHash))) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const permissions = this.extractPermissions(user.roles);
    const tokens = await this.signTokens(user.id, user.username, permissions);
    await this.storeRefreshToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: { id: user.id, username: user.username, displayName: user.displayName, permissions },
    };
  }

  async register(dto: RegisterDto) {
    const exists = await this.prisma.user.findUnique({ where: { username: dto.username } });
    if (exists) throw new BadRequestException('Username already exists');

    const passwordHash = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.create({
      data: {
        username: dto.username,
        displayName: dto.displayName,
        email: dto.email,
        passwordHash,
      },
      select: { id: true, username: true, displayName: true, email: true },
    });
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync<{ sub: number }>(refreshToken, {
      secret: this.config.get<string>('JWT_REFRESH_SECRET', 'change-me-refresh'),
    });
    const saved = await this.prisma.refreshToken.findFirst({ where: { userId: payload.sub, token: refreshToken, revokedAt: null } });
    if (!saved) throw new UnauthorizedException('Invalid refresh token');

    await this.prisma.refreshToken.update({ where: { id: saved.id }, data: { revokedAt: new Date() } });
    const profile = await this.profile(payload.sub);
    const tokens = await this.signTokens(profile.id, profile.username, profile.permissions);
    await this.storeRefreshToken(profile.id, tokens.refreshToken);
    return tokens;
  }

  async profile(userId: number) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      include: { roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } } },
    });
    const permissions = this.extractPermissions(user.roles);
    return { id: user.id, username: user.username, displayName: user.displayName, permissions };
  }

  private extractPermissions(roles: Array<{ role: { permissions: Array<{ permission: { code: string } }> } }>) {
    return [...new Set(roles.flatMap((item) => item.role.permissions.map((rp) => rp.permission.code)))];
  }

  private async signTokens(userId: number, username: string, permissions: string[]) {
    const payload = { sub: userId, username, permissions };
    const accessExpiresIn = this.config.get<NonNullable<JwtSignOptions['expiresIn']>>(
      'JWT_ACCESS_EXPIRES_IN',
      '15m',
    );
    const refreshExpiresIn = this.config.get<NonNullable<JwtSignOptions['expiresIn']>>(
      'JWT_REFRESH_EXPIRES_IN',
      '7d',
    );
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.config.get<string>('JWT_ACCESS_SECRET', 'change-me-access'),
        expiresIn: accessExpiresIn,
      }),
      this.jwtService.signAsync({ sub: userId }, {
        secret: this.config.get<string>('JWT_REFRESH_SECRET', 'change-me-refresh'),
        expiresIn: refreshExpiresIn,
      }),
    ]);
    return { accessToken, refreshToken };
  }

  private async storeRefreshToken(userId: number, token: string) {
    await this.prisma.refreshToken.create({
      data: { userId, token, expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) },
    });
  }
}
