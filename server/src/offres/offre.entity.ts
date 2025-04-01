import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Offre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  titre: string;

  @Column({ name: 'societe', nullable: false })
  societe: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ nullable: false })
  localisation: string;

  @Column({ nullable: true })
  salaire?: string;

  @Column({ type: 'date', nullable: true })
  deadline?: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}