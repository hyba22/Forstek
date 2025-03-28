import { IsDate, IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUrl, MinLength } from 'class-validator';
import { Role } from '../users/dto/user.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  prenom?: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
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

  @IsNotEmpty()
  @IsEnum(Role)
  role: Role;
}