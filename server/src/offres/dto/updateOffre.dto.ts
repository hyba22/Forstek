import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateOffreDto {
  @IsOptional()
  @IsString()
  titre?: string;

  @IsOptional()
  @IsString()
  societe?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  localisation?: string;

  @IsOptional()
  @IsString()
  salaire?: string;

  @IsOptional()
  @IsDateString()
  deadline?: Date;
}