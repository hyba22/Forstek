import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Deposeprojet {
  @PrimaryGeneratedColumn()
  iddeposeprojet: number;

  @Column()
  nomporteur: string;

  @Column()
  email: string;

  @Column()
  titreprojet: string;

  @Column()
  descriptionprojet: string;

  @Column()
  domaineprojet: string;

  @Column()
  budget: string;

  @Column()
  moyens: string;

  @Column()
  datedebut: Date;

  @Column()
  datefin: Date;
}