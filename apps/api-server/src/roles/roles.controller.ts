import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequirePermissions } from '../common/decorators/permissions.decorator';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../common/guards/permissions.guard';
import { RoleDto } from './dto';
import { RolesService } from './roles.service';

@ApiTags('roles')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, PermissionsGuard)
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @RequirePermissions('role:view')
  @Get()
  list(@Query('page') page = '1', @Query('pageSize') pageSize = '10') {
    return this.rolesService.list(Number(page), Number(pageSize));
  }

  @RequirePermissions('role:create')
  @Post()
  create(@Body() dto: RoleDto) {
    return this.rolesService.create(dto);
  }

  @RequirePermissions('role:update')
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: RoleDto) {
    return this.rolesService.update(Number(id), dto);
  }

  @RequirePermissions('role:delete')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(Number(id));
  }
}
