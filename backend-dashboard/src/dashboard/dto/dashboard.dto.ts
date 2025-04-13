import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDashboardDto {
  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsOptional()
  @IsString()
  description?: string;
}