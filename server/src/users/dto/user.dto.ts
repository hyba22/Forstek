import { IsEmail, IsIn, IsNotEmpty, MinLength, IsOptional } from 'class-validator';

export enum Role {
  ADMIN = 'admin',
  PORTEUR_DE_PROJET = 'porteur_de_projet',
  STARTUP = 'startup',
  STAGIAIRE = 'stagiaire',
  PARTENAIRE = 'partenaire',
  UTILISATEUR = 'utilisateur',
  INVESTISSEUR = 'investisseur',
  VISITEUR = 'visiteur',
  FREELANCE = 'freelance',
}

export class CreateUserDto {
  @IsOptional()
  name?: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
  @IsOptional()
  prenom?: string;
  
  @IsOptional()
  siteUrl?: string;

  @IsOptional()
  telephone?: string;

  @IsOptional()
  domaine?: string;

  @IsOptional()
  nomSociete?: string;

  @IsOptional()
  adressePostale?: string;

  @IsOptional()
  dateCreation?: Date;
  @IsOptional()
  competences?: string;
  
  @IsNotEmpty()
  @IsIn([
    Role.ADMIN,
    Role.PORTEUR_DE_PROJET,
    Role.STARTUP,
    Role.STAGIAIRE,
    Role.PARTENAIRE,
    Role.UTILISATEUR,
    Role.INVESTISSEUR,
    Role.VISITEUR,
    Role.FREELANCE
  ], { message: 'Rôle invalide. Choisissez un rôle valide.' })
  role: Role;


}