import { Injectable } from '@nestjs/common';
import bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async list(page: number, pageSize: number, keyword: string) {
    const where = keyword
      ? { OR: [{ username: { contains: keyword } }, { displayName: { contains: keyword } }, { email: { contains: keyword } }] }
      : {};
    const [items, total] = await Promise.all([
      this.prisma.user.findMany({
        where,
        skip: (page - 1) * pageSize,
        take: pageSize,
        select: { id: true, username: true, displayName: true, email: true, enabled: true, createdAt: true },
        orderBy: { id: 'desc' },
      }),
      this.prisma.user.count({ where }),
    ]);
    return { items, total };
  }

  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 12);
    return this.prisma.user.create({
      data: { username: dto.username, displayName: dto.displayName, email: dto.email, passwordHash },
      select: { id: true, username: true, displayName: true, email: true, enabled: true },
    });
  }

  update(id: number, dto: UpdateUserDto) {
    return this.prisma.user.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
