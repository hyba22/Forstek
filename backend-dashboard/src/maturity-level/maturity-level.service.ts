import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaturityLevelDto } from './dto/create-maturity-level.dto';
import { UpdateMaturityLevelDto } from './dto/update-maturity-level.dto';
import { MaturityLevel } from './entities/maturity-level.entity';

@Injectable()
export class MaturityLevelService {
  constructor(
    @InjectRepository(MaturityLevel)
    private readonly maturityLevelRepository: Repository<MaturityLevel>,
  ) {}

  async create(createMaturityLevelDto: CreateMaturityLevelDto): Promise<MaturityLevel> {
    const maturityLevel = this.maturityLevelRepository.create(createMaturityLevelDto);
    return await this.maturityLevelRepository.save(maturityLevel);
  }

  async findAll(): Promise<MaturityLevel[]> {
    return await this.maturityLevelRepository.find();
  }

  async findOne(id: number): Promise<MaturityLevel> {
    const maturityLevel = await this.maturityLevelRepository.findOne({ where: { id } });
    if (!maturityLevel) {
      throw new NotFoundException(`MaturityLevel with ID ${id} not found`);
    }
    return maturityLevel;
  }

  async update(id: number, updateMaturityLevelDto: UpdateMaturityLevelDto): Promise<MaturityLevel> {
    const maturityLevel = await this.findOne(id);
    Object.assign(maturityLevel, updateMaturityLevelDto);
    return await this.maturityLevelRepository.save(maturityLevel);
  }

  async remove(id: number): Promise<void> {
    const result = await this.maturityLevelRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`MaturityLevel with ID ${id} not found`);
    }
  }

  async getChartData() {
    const levels = await this.findAll();
    return {
      labels: levels.map(level => level.name),
      datasets: [{
        label: 'Niveau de Maturité',
        data: levels.map(level => level.percentage),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    };
  }
}