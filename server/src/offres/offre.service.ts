import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offre } from './offre.entity';
import { Repository } from 'typeorm';
import { CreateOffreDto } from './dto/offre.dto';

@Injectable()
export class OffreService {
    constructor(
        @InjectRepository(Offre)
        private offresRepository: Repository<Offre>,
      ) {}
    
      async create(createOffreDto: CreateOffreDto): Promise<Offre> {
        const offre = this.offresRepository.create(createOffreDto);
        return this.offresRepository.save(offre);
      }
    
      async findAll(): Promise<Offre[]> {
        return this.offresRepository.find();
      }
    
}
