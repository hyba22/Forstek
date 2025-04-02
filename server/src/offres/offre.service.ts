import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Offre } from './offre.entity';
import { Repository } from 'typeorm';
import { CreateOffreDto } from './dto/offre.dto';
import { UpdateOffreDto } from './dto/updateOffre.dto';

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

      async findOne(id: number): Promise<Offre> {
        const offre = await this.offresRepository.findOne({ where: { id } });
        if (!offre) {
          throw new NotFoundException(`Offre with ID ${id} not found`);
        }
        return offre;
      }
    
      async update(id: number, updateOffreDto: UpdateOffreDto): Promise<Offre> {
        const offre = await this.findOne(id);
        const updated = await this.offresRepository.save({
          ...offre,
          ...updateOffreDto,
        });
        return updated;
      }
    
      async remove(id: number): Promise<void> {
        const result = await this.offresRepository.delete(id);
        if (result.affected === 0) {
          throw new NotFoundException(`Offre with ID ${id} not found`);
        }
      }

     
}
