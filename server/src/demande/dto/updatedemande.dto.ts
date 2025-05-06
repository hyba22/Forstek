import { IsString, IsOptional, IsEnum } from 'class-validator';
import { StatutDemande } from './statut-demande.enum'; 

export class UpdateDemandeDto {
  @IsString()
  @IsOptional()
  lettreMotivation?: string;

  @IsString()
  @IsOptional()
  cv?: string;

  @IsString()
  @IsOptional()
  @IsEnum(StatutDemande, {
    message: `Le statut doit être l'une des valeurs suivantes: ${Object.values(StatutDemande).join(', ')}`
  })
  statut?: StatutDemande; 
}