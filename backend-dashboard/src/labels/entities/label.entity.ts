import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Label {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  year: string;

  @Column()
  value: number;

  @Column()
  forecast: number;
}