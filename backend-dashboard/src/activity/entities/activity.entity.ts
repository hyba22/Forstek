import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  aspect: string;

  @Column()
  name: string;
}