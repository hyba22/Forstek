import { IsEmail, IsIn, IsNotEmpty, MinLength } from 'class-validator';

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
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @IsIn( [
    Role.ADMIN,
    Role.PORTEUR_DE_PROJET,
    Role.STARTUP,
    Role.STAGIAIRE,
    Role.PARTENAIRE,
    Role.UTILISATEUR,
    Role.INVESTISSEUR,
    Role.VISITEUR,
    Role.FREELANCE
  ],
  { message: 'Rôle invalide. Choisissez un rôle valide.' }
)
role: Role;
}