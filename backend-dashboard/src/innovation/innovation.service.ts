import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateInnovationDto } from './dto/create-innovation.dto';
import { UpdateInnovationDto } from './dto/update-innovation.dto';
import { Innovation } from './entities/innovation.entity';

@Injectable()
export class InnovationService {
  constructor(
    @InjectRepository(Innovation)
    private readonly innovationRepository: Repository<Innovation>,
  ) {}

  async create(createInnovationDto: CreateInnovationDto): Promise<Innovation> {
    const innovation = this.innovationRepository.create(createInnovationDto);
    return await this.innovationRepository.save(innovation);
  }

  async findAll(): Promise<Innovation[]> {
    return await this.innovationRepository.find();
  }

  async findOne(id: number): Promise<Innovation> {
    const innovation = await this.innovationRepository.findOne({ where: { id } });
    if (!innovation) {
      throw new NotFoundException(`Innovation with ID ${id} not found`);
    }
    return innovation;
  }

  async update(id: number, updateInnovationDto: UpdateInnovationDto): Promise<Innovation> {
    const innovation = await this.findOne(id);
    Object.assign(innovation, updateInnovationDto);
    return await this.innovationRepository.save(innovation);
  }

  async remove(id: number): Promise<void> {
    const result = await this.innovationRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Innovation with ID ${id} not found`);
    }
  }

  async getChartData() {
    const innovations = await this.findAll();
    return {
      labels: innovations.map(i => i.name),
      datasets: [{
        label: 'Durée d\'Innovation',
        data: innovations.map(i => i.duration),
        backgroundColor: [
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)'
        ],
        borderColor: [
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    };
  }
}