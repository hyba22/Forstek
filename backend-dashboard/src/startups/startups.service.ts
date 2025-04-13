import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { Startup } from './entities/startup.entity';

@Injectable()
export class StartupsService {
  constructor(
    @InjectRepository(Startup)
    private startupsRepository: Repository<Startup>,
  ) {}

  // Créer une nouvelle startup
  async create(createStartupDto: CreateStartupDto): Promise<Startup> {
    const startup = this.startupsRepository.create(createStartupDto);
    return await this.startupsRepository.save(startup);
  }

  // Récupérer toutes les startups
  async findAll(): Promise<Startup[]> {
    return await this.startupsRepository.find();
  }

  // Récupérer une startup spécifique par son ID
  async findOne(id: number): Promise<Startup> {
    const startup = await this.startupsRepository.findOne({ where: { id } });

    // Vérifier si la startup existe
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    return startup;
  }

  // Mettre à jour une startup
  async update(id: number, updateStartupDto: UpdateStartupDto): Promise<Startup | null> {
    const startup = await this.startupsRepository.findOne({ where: { id } });

    // Vérifier si la startup existe
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    await this.startupsRepository.update(id, updateStartupDto);
    // Retourner l'objet après la mise à jour, ou null si aucune startup n'est trouvée
    return await this.startupsRepository.findOne({ where: { id } });
  }

  // Supprimer une startup
  async remove(id: number): Promise<void> {
    const startup = await this.startupsRepository.findOne({ where: { id } });

    // Vérifier si la startup existe
    if (!startup) {
      throw new NotFoundException(`Startup with ID ${id} not found`);
    }

    await this.startupsRepository.delete(id);
  }

  // Récupérer les statistiques des durées de startup
  async getDurationStats(): Promise<any> {
    const startups = await this.findAll();
    const stats = {};

    startups.forEach(startup => {
      if (!stats[startup.duration]) {
        stats[startup.duration] = 0;
      }
      stats[startup.duration]++;
    });

    return Object.keys(stats).map(duration => ({
      name: duration,
      value: stats[duration],
    }));
  }
}
