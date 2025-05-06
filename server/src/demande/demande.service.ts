import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Demandes } from './demande.entity';
import { CreateDemandeDto } from './dto/createdemande.dto';
import { UpdateDemandeDto } from './dto/updatedemande.dto';
import { StatutDemande } from './dto/statut-demande.enum';
import { plainToInstance } from 'class-transformer';
import { Offre } from 'src/offres/offre.entity';


@Injectable()
export class DemandeService {
  constructor(
    @InjectRepository(Demandes)
    private demandeRepository: Repository<Demandes>,
    
  ) {}
  
  async createForOffer(createDemandeDto: CreateDemandeDto): Promise<Demandes> {
    const offreId = createDemandeDto.offreId;
    if (isNaN(offreId)) {
      throw new BadRequestException('Invalid offer ID');
    }
  
    const demande = this.demandeRepository.create({
      ...createDemandeDto,
      offreId,
      cv: createDemandeDto.cv ?? null,
      statut: StatutDemande.EN_ATTENTE
    });
    
    return this.demandeRepository.save(demande);
  }
  async create(createDemandeDto: CreateDemandeDto): Promise<Demandes> {
    const demande = this.demandeRepository.create({
      offreId: Number(createDemandeDto.offreId),
      name: createDemandeDto.name,
      email: createDemandeDto.email,
      lettreMotivation: createDemandeDto.lettreMotivation,
      cv: createDemandeDto.cv,
      statut: createDemandeDto.statut,
      dateDemande: new Date()
    } as Demandes); 
    
    return this.demandeRepository.save(demande);
  }


  async findAll(): Promise<Demandes[]> {
    return this.demandeRepository.find();
  }
  async findOne(id: number): Promise<Demandes> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID format');
    }

    const demande = await this.demandeRepository.findOneOrFail({
      where: { id },
      relations: ['offre'], 
    }).catch(() => {
      throw new NotFoundException(`Demande with ID ${id} not found`);
    });

    return demande;
  }

  async getOffreByDemandeId(demandeId: number): Promise<Offre> {
    const demande = await this.demandeRepository.findOneOrFail({
      where: { id: demandeId },
      relations: ['offre'],
    });
    return demande.offre;
  }

async update(id: number, updateDemandeDto: UpdateDemandeDto): Promise<Demandes> {
  if (isNaN(id)) {
    throw new BadRequestException('Invalid ID format');
  }
    const demande = await this.findOne(id);
    const updated = await this.demandeRepository.save({
      ...demande,
      ...updateDemandeDto,
    });
    return updated;
  }

  async remove(id: number): Promise<void> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID format');}
    const result = await this.demandeRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Demande avec l'ID ${id} non trouvée`);
    }
  }

  async updateStatut(id: number, statut: StatutDemande): Promise<Demandes> {
    if (isNaN(id)) {
      throw new BadRequestException('Invalid ID format');}
    const demande = await this.findOne(id);
    demande.statut = statut;
    return this.demandeRepository.save(demande);
  }

  async handleCVUpload(file: Express.Multer.File): Promise<{ filePath: string; originalname: string }> { 
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    
    return { 
      filePath: `/uploads/${file.filename}`,
      originalname: file.originalname 
    };
  }
/*
async findAllWithOffers(): Promise<Demandes[]> {
  return this.demandeRepository.find({
    relations: ['offre'],
    select: {
      id: true,
      name: true,
      email: true,
      statut: true,
      dateDemande: true,
      offre: {
        id: true,
        titre: true,
        societe: true
      }
    },
    order: { dateDemande: 'DESC' }
  });
}*/

async findAllWithOffers(): Promise<any> {
  try {
    console.log('Starting database query...');
    const result = await this.demandeRepository
      .createQueryBuilder('demandes')
      .leftJoinAndSelect('demandes.offre', 'offre')
      .select([
        'demandes.id',
        'demandes.dateDemande',
        'demandes.statut',
        'offre.id',
        'offre.titre',
        'offre.societe',
      ])
      .orderBy('demandes.dateDemande', 'DESC')
      .getMany();
    console.log('Query result:', result);
    return result;
  } catch (error) {
    console.error('Database error:', error);
    throw new InternalServerErrorException('Failed to fetch demandes with offers');
  }
}
}