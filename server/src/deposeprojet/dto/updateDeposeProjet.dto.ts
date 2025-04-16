import { IsOptional, IsString, IsDateString } from 'class-validator';

export class UpdateDeposeProjetDto {
  @IsOptional()
  @IsString()
  nomporteur?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  titreprojet?: string;

  @IsOptional()
  @IsString()
  descriptionprojet?: string;

  @IsOptional()
  @IsString()
  domaineprojet?: string;

  @IsOptional()
  @IsString()
  budget?: string;

  @IsOptional()
  @IsString()
  moyens?: string;

  @IsOptional()
  datedebut?: Date;

  @IsOptional()
  datefin?: Date;
}