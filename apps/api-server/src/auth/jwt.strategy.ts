import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { REDIS_CLIENT } from '../redis/redis.module';
import Redis from 'ioredis';

export interface JwtPayload {
  sub: number;
  username: string;
  permissions: string[];
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(config: ConfigService, @Inject(REDIS_CLIENT) private readonly redis: Redis) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get<string>('JWT_ACCESS_SECRET', 'change-me-access'),
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: JwtPayload) {
    const auth = req.headers.authorization as string | undefined;
    if (!auth) throw new UnauthorizedException('Missing authorization header');
    const token = auth.split(' ')[1];
    const key = `token:${payload.sub}`;
    try {
      const saved = await this.redis.get(key);
      if (!saved || saved !== token) throw new UnauthorizedException('Token expired or invalid');
    } catch (_err) {
      throw new UnauthorizedException('Token validation failed');
    }
    return { id: payload.sub, username: payload.username, permissions: payload.permissions };
  }
}
