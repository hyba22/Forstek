import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('startups')
export class Startup {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  duration: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: true })
  foundedYear: number;
}