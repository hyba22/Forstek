import { Injectable, NotFoundException } from '@nestjs/common';
import { Deposeprojet } from './deposeprojet.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDeposeProjetDto } from './dto/deposeprojet.dto';
import { UpdateDeposeProjetDto } from './dto/updateDeposeProjet.dto';
@Injectable()
export class DeposeprojetService {
      constructor(
            @InjectRepository(Deposeprojet)
            private deposeprojetRepository: Repository<Deposeprojet>,
          ) {}
        
          async create(createDeposeProjetDto: CreateDeposeProjetDto): Promise<Deposeprojet> {
            const deposeprojet = this.deposeprojetRepository.create(createDeposeProjetDto);
            return this.deposeprojetRepository.save(deposeprojet);
          }
        
          async findAll(): Promise<Deposeprojet[]> {
            return this.deposeprojetRepository.find();
          }
    
          async findOne(iddeposeprojet: number): Promise<Deposeprojet> {
            const deposeprojet = await this.deposeprojetRepository.findOne({ where: { iddeposeprojet } });
            if (!deposeprojet) {
              throw new NotFoundException(`Projet with ID ${iddeposeprojet} not found`);
            }
            return deposeprojet;
          }
        
          async update(iddeposeprojet: number, updateDeposeProjetDto: UpdateDeposeProjetDto): Promise<Deposeprojet> {
            const deposeprojet = await this.findOne(iddeposeprojet);
            const updated = await this.deposeprojetRepository.save({
              ...deposeprojet,
              ...updateDeposeProjetDto,
            });
            return updated;
          }
        
          async remove(iddeposeprojet: number): Promise<void> {
            const result = await this.deposeprojetRepository.delete(iddeposeprojet);
            if (result.affected === 0) {
              throw new NotFoundException(`Projet with ID ${iddeposeprojet} not found`);
            }
          }
}
