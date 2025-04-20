import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projet_freelance')
export class ProjetFreelance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomSociete: string;

  @Column({ unique: true })
  email: string;

  @Column({ default: true })
  isActive: boolean;

  @Column()
  titreprojet: string;

  @Column()
  descriptionprojet: string;

  @Column()
  domaineprojet: string;

  @Column('decimal', { precision: 10, scale: 2 })
  budget: number;

  @Column()
  competencesRequises: string;

  @Column()
  datedebut: Date;
  
  @Column()
  datefin: Date;
}