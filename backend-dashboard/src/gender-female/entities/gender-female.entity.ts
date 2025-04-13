import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GenderFemale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @Column()
  percentage: number;
}