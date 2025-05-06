import { IsNumber, IsString, IsEmail, IsNotEmpty, IsOptional, IsEnum, IsInt, IsNumberString } from 'class-validator';
import { StatutDemande } from './statut-demande.enum';

export class CreateDemandeDto {

  @IsNumberString()
  offreId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsOptional()
  lettreMotivation?: string;

  @IsString()
  @IsNotEmpty()
  cv?: string;

  @IsOptional()
  @IsEnum(StatutDemande)
  statut?: StatutDemande;
}