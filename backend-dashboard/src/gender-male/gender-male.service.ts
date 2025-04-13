import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenderMaleDto, UpdateGenderMaleDto } from './dto/gender-male.dto';
import { GenderMale } from './entities/gender-male.entity';

@Injectable()
export class GenderMaleService {
  constructor(
    @InjectRepository(GenderMale)
    private readonly genderMaleRepository: Repository<GenderMale>,
  ) {}

  async create(createGenderMaleDto: CreateGenderMaleDto): Promise<GenderMale> {
    const genderMale = this.genderMaleRepository.create(createGenderMaleDto);
    return await this.genderMaleRepository.save(genderMale);
  }

  async findAll(): Promise<GenderMale[]> {
    return await this.genderMaleRepository.find();
  }

  async findOne(id: number): Promise<GenderMale> {
    const genderMale = await this.genderMaleRepository.findOne({ where: { id } });
    if (!genderMale) {
      throw new NotFoundException(`GenderMale with ID ${id} not found`);
    }
    return genderMale;
  }

  async update(
    id: number,
    updateGenderMaleDto: UpdateGenderMaleDto,
  ): Promise<GenderMale> {
    const genderMale = await this.findOne(id);
    await this.genderMaleRepository.update(id, updateGenderMaleDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.genderMaleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`GenderMale with ID ${id} not found`);
    }
  }
}