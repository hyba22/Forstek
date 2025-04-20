import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjetFreelance } from './projetFreelance.entity';
import { CreateProjetFreelanceDto } from './dto/CreateProjetFreelance.dto';
import { UpdateProjetFreelanceDto } from './dto/UpdateProjetFreelance.dto';


@Injectable()
export class ProjetFreelanceService {
  constructor(
    @InjectRepository(ProjetFreelance)
    private readonly projetFreelanceRepository: Repository<ProjetFreelance>,
  ) {}

  async create(createDto: CreateProjetFreelanceDto): Promise<ProjetFreelance> {
    const projet = this.projetFreelanceRepository.create(createDto);
    return await this.projetFreelanceRepository.save(projet);
  }

  async findAll(): Promise<ProjetFreelance[]> {
    return await this.projetFreelanceRepository.find();
  }

  async findOne(id: number): Promise<ProjetFreelance> {
    const projet = await this.projetFreelanceRepository.findOne({ where: { id } });
    if (!projet) {
      throw new NotFoundException(`Projet with ID ${id} not found`);
    }
    return projet;
  }

  async update(id: number, updateDto: UpdateProjetFreelanceDto): Promise<ProjetFreelance> {
    const projet = await this.findOne(id);
    this.projetFreelanceRepository.merge(projet, updateDto);
    return await this.projetFreelanceRepository.save(projet);
  }

  async remove(id: number): Promise<void> {
    const result = await this.projetFreelanceRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Projet with ID ${id} not found`);
    }
  }

  async findByEmail(email: string): Promise<ProjetFreelance> {
    const projet = await this.projetFreelanceRepository.findOne({ where: { email } });
    if (!projet) {
      throw new NotFoundException(`Projet with email ${email} not found`);
    }
    return projet;
  }
}