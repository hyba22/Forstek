import { Column, Entity, IsNull, Long, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './dto/user.dto';
import Demande from 'src/stagiaire/demande.entity';

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  prenom: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password: string;


  @Column({ nullable: true })
  siteUrl: string;

  @Column({ nullable: true })
  telephone: string;

  @Column({ nullable: true })
  domaine: string;

  @Column({ nullable: true })
  competences: string;

  @Column({ nullable: true })
  nomSociete: string;

  @Column({ nullable: true })
  adressePostale: string;

  @Column({ nullable: true })
  dateCreation: Date;
  
  @Column({
    type: 'enum',
    enum: Role,
    default: Role.UTILISATEUR,
  })
  role: Role;

  @OneToMany(() => Demande, (demande) => demande.user)
  demandes: Demande[];
}

export default User;
