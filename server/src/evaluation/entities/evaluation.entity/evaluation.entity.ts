import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Evaluation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  projectId: number;

  @Column()
  partnerId: number;

  @Column()
  score: number;

  @Column({ nullable: true })
  comments: string;

  @Column()
  date: Date;

  // Critères en étoiles
  @Column()
  innovationStars: number;

  @Column()
  marketPotentialStars: number;

  @Column()
  teamStars: number;

  @Column()
  feasibilityStars: number;

  @Column()
  overallStars: number;

  @Column({ default: false })
  notificationSent: boolean;
}