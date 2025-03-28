import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { Role } from '../../users/dto/user.dto';

export class SignUpDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Tapez un correct email' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6, { message: 'Mot de passe doit etre 6 caractères minimum' })
  password: string;

  @IsOptional()
  @IsUrl()
  siteUrl?: string;

  @IsOptional()
  @IsString()
  telephone?: string;

  @IsOptional()
  @IsString()
  domaine?: string;

  @IsOptional()
  @IsString()
  competences?: string;

  @IsOptional()
  @IsString()
  nomSociete?: string;

  @IsOptional()
  @IsString()
  adressePostale?: string;

  @IsOptional()
  @IsDate()
  dateCreation?: Date;

  @IsOptional()
  role?: Role;
}