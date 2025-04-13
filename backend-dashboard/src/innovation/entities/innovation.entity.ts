import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Innovation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('int')
  duration: number;
}