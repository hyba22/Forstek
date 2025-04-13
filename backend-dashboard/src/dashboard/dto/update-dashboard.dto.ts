import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDashboardDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsNumber()
  duration?: number;

  @IsOptional()
  @IsString()
  description?: string;
}