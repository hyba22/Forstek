import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Demande from './demande.entity';
import { UsersService } from '../users/users.service';
@Injectable()
export class StagiaireService {
  constructor(
    @InjectRepository(Demande)
    private demandesRepository: Repository<Demande>,
    private usersService: UsersService,
  ) {}

  async getDemandesByUser(userId: number): Promise<Demande[]> {
    return this.demandesRepository.find({ where: { user: { id: userId } } });
  }

  async updateParametres(userId: number, data: { nom: string; email: string }) {
    const updatedUser = await this.usersService.updateUser(userId, { name: data.nom, email: data.email });
    return { message: "Paramètres mis à jour", data: updatedUser };
  }

  async updatePassword(userId: number, motDePasse: string) {
    const hashedPassword = await import('bcryptjs').then(bcrypt => bcrypt.hash(motDePasse, 10));
    const updatedUser = await this.usersService.updateUser(userId, { password: hashedPassword });
    return { message: "Mot de passe mis à jour", data: updatedUser };
  }

  async deleteCompte(userId: number) {
    await this.usersService.deleteById(userId);
    return { message: "Compte supprimé" };
  }
}