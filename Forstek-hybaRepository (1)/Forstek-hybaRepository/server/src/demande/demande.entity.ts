import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Demande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  nomProjet: string;

  @Column({ name: 'nom_porteur', nullable: false })
  nomPorteur: string;

  @Column({ nullable: false })
  email: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ nullable: true })
  secteurActivite?: string;

  @Column({ name: 'stade_developpement', nullable: true })
  stadeDeveloppement?: string;

  @Column({ nullable: true })
  siteWeb?: string;

  @Column({ type: 'text', nullable: true })
  besoins?: string;

  @Column({ name: 'date_creation', type: 'date', nullable: true })
  dateCreation?: Date;

  @Column({ type: 'text', nullable: true })
  equipe?: string;

  @Column({ 
    type: 'varchar', 
    nullable: false, 
    default: 'en_attente'
  })
  statut: string;

  @Column({ 
    name: 'created_at',
    type: 'timestamp', 
    default: () => 'CURRENT_TIMESTAMP' 
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP'
  })
  updatedAt: Date;
}