import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GenderMale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @Column()
  percentage: number;
}