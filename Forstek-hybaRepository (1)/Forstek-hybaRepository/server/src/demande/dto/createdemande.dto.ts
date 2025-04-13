import { IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export class CreateDemandeDto {
  @IsNotEmpty()
  @IsString()
  nomProjet: string;

  @IsNotEmpty()
  @IsString()
  nomPorteur: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  description: string;

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
}