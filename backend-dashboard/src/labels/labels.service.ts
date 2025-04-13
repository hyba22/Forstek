import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLabelDto } from './dto/create-label.dto';
import { UpdateLabelDto } from './dto/update-label.dto';
import { Label } from './entities/label.entity';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private labelsRepository: Repository<Label>,
  ) {}

  findAll(): Promise<Label[]> {
    return this.labelsRepository.find();
  }

  create(createLabelDto: CreateLabelDto): Promise<Label> {
    const label = this.labelsRepository.create(createLabelDto);
    return this.labelsRepository.save(label);
  }

  async update(id: number, updateLabelDto: UpdateLabelDto): Promise<Label> {
    await this.labelsRepository.update(id, updateLabelDto);
    const updatedLabel = await this.labelsRepository.findOneBy({ id });
    
    if (!updatedLabel) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
    
    return updatedLabel;
  }

  async remove(id: number): Promise<void> {
    const result = await this.labelsRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Label with ID ${id} not found`);
    }
  }
}