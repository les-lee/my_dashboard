import { IsOptional, IsString } from 'class-validator';

export class PermissionDto {
  @IsString()
  name: string;

  @IsString()
  code: string;

  @IsString()
  resource: string;

  @IsOptional()
  @IsString()
  description?: string;
}
