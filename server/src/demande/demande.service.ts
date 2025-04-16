import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demande } from './demande.entity';
import { CreateDemandeDto } from './dto/createdemande.dto';
import { UpdateDemandeDto } from './dto/updatedemande.dto';


@Injectable()
export class DemandeService {
  constructor(
    @InjectRepository(Demande)
    private demandeRepository: Repository<Demande>,
  ) {}

  async create(createDemandeDto: CreateDemandeDto): Promise<Demande> {
    const demande = this.demandeRepository.create(createDemandeDto);
    return this.demandeRepository.save(demande);
  }

  async findAll(): Promise<Demande[]> {
    return this.demandeRepository.find();
  }

  async findOne(id: number): Promise<Demande> {
    const demande = await this.demandeRepository.findOne({ where: { id } });
    if (!demande) {
      throw new NotFoundException(`Demande avec l'ID ${id} non trouvée`);
    }
    return demande;
  }

  async update(id: number, updateDemandeDto: UpdateDemandeDto): Promise<Demande> {
    const demande = await this.findOne(id);
    const updated = await this.demandeRepository.save({
      ...demande,
      ...updateDemandeDto,
    });
    return updated;
  }

  async remove(id: number): Promise<void> {
    const result = await this.demandeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Demande avec l'ID ${id} non trouvée`);
    }
  }

  async updateStatut(id: number, statut: string): Promise<Demande> {
    const demande = await this.findOne(id);
    demande.statut = statut;
    return this.demandeRepository.save(demande);
  }
}