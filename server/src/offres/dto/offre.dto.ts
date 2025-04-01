import { IsNotEmpty, IsString, IsOptional, IsDateString } from 'class-validator';

export class CreateOffreDto {
  @IsNotEmpty()
  @IsString()
  titre: string;

  @IsNotEmpty()
  @IsString()
  societe: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  localisation: string;

  @IsOptional()
  @IsString()
  salaire?: string;

  @IsOptional()
  @IsDateString()
  deadline?: Date;
}