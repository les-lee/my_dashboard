import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { PermissionDto } from './dto';
import { PermissionsService } from './permissions.service';

@ApiTags('permissions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @RequirePermissions('permission:view')
  @Get()
  list(@Query('page') page = '1', @Query('pageSize') pageSize = '50') {
    return this.permissionsService.list(Number(page), Number(pageSize));
  }

  @RequirePermissions('permission:create')
  @Post()
  create(@Body() dto: PermissionDto) {
    return this.permissionsService.create(dto);
  }
}
