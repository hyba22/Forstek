import { Column, Entity, IsNull, Long, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './dto/user.dto';

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
    nullable: false 
  })
  role: Role;
}

export default User;
