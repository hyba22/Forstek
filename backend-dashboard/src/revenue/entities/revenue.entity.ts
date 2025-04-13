import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Revenue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal', { precision: 15, scale: 2 })
  amount: number;
}