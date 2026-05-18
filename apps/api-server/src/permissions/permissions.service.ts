import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PermissionDto } from './dto';

@Injectable()
export class PermissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async list(page: number, pageSize: number) {
    const [items, total] = await Promise.all([
      this.prisma.permission.findMany({ skip: (page - 1) * pageSize, take: pageSize, orderBy: { id: 'desc' } }),
      this.prisma.permission.count(),
    ]);
    return { items, total };
  }

  create(dto: PermissionDto) {
    return this.prisma.permission.create({ data: dto });
  }
}
