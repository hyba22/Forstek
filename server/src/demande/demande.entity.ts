import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { StatutDemande } from '../demande/dto/statut-demande.enum';
import { Offre } from 'src/offres/offre.entity';
import { IsInt } from 'class-validator';
import { Expose } from 'class-transformer';

@Entity("demandes")
export class Demandes {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'offre_id', nullable: false }) 
  offreId: number;

  @Column({ nullable: false })
  name: string;


  @Column({ nullable: false })
  email: string;

  @Column({ type: 'text', nullable: true })
  lettreMotivation: string;
  
  
  @Column({ type: 'text', nullable: true }) 
  @Expose()
  cv: string | null; 

  @Column({
    type: 'enum',
    enum: StatutDemande,
    default: StatutDemande.EN_ATTENTE
  })
  statut: StatutDemande;

  @Column({ 
    name: 'dateDemande',
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP' 
  })
  dateDemande: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;

  @ManyToOne(() => Offre, (offre) => offre.demandes)
  @JoinColumn({ name: 'offre_id' })
  offre: Offre;
}