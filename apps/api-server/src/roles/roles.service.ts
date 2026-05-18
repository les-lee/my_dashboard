import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoleDto } from './dto';

@Injectable()
export class RolesService {
  constructor(private readonly prisma: PrismaService) {}

  async list(page: number, pageSize: number) {
    const [items, total] = await Promise.all([
      this.prisma.role.findMany({ skip: (page - 1) * pageSize, take: pageSize, orderBy: { id: 'desc' } }),
      this.prisma.role.count(),
    ]);
    return { items, total };
  }

  create(dto: RoleDto) {
    return this.prisma.role.create({ data: dto });
  }

  update(id: number, dto: RoleDto) {
    return this.prisma.role.update({ where: { id }, data: dto });
  }

  remove(id: number) {
    return this.prisma.role.delete({ where: { id } });
  }
}
