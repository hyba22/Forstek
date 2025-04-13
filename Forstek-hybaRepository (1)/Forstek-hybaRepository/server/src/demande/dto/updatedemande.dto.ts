import { IsEmail, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateDemandeDto {
  @IsOptional()
  @IsString()
  nomProjet?: string;

  @IsOptional()
  @IsString()
  nomPorteur?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  secteurActivite?: string;

  @IsOptional()
  @IsString()
  stadeDeveloppement?: string;

  @IsOptional()
  @IsUrl()
  siteWeb?: string;

  @IsOptional()
  @IsString()
  besoins?: string;

  @IsOptional()
  @IsString()
  equipe?: string;

  @IsOptional()
  @IsString()
  statut?: string;
}