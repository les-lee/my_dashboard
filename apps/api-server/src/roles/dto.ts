import { IsOptional, IsString } from 'class-validator';

export class RoleDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsOptional()
  @IsString()
  description?: string;
}
