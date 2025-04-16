import { IsNotEmpty } from 'class-validator';

export class CreateDeposeProjetDto {
  @IsNotEmpty()
  nomporteur: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  titreprojet: string;

  @IsNotEmpty()
  descriptionprojet: string;
  @IsNotEmpty()
  domaineprojet: string;
  @IsNotEmpty()
  budget: string;

  @IsNotEmpty()
  moyens: string;

  datedebut: Date;

  datefin: Date;
}