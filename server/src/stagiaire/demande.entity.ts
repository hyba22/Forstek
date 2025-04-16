import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "../users/user.entity";

@Entity()
export default class Demande {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomSociete: string;

  @Column()
  poste: string;

  @Column({ type: "date" })
  dateDemande: string;

  @Column({ default: "En attente" })
  etat: string;

  @Column({ default: "N/A" })
  reponse: string;

  @ManyToOne(() => User, (user) => user.demandes)
  user: User;
}