import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenderFemaleDto, UpdateGenderFemaleDto } from './dto/gender-female.dto';
import { GenderFemale } from './entities/gender-female.entity';

@Injectable()
export class GenderFemaleService {
  constructor(
    @InjectRepository(GenderFemale)
    private readonly genderFemaleRepository: Repository<GenderFemale>,
  ) {}

  findAll(): Promise<GenderFemale[]> {
    return this.genderFemaleRepository.find();
  }

  async findOne(id: number): Promise<GenderFemale> {
    const record = await this.genderFemaleRepository.findOneBy({ id });
    if (!record) {
      throw new NotFoundException(`GenderFemale with ID ${id} not found`);
    }
    return record;
  }

  create(createDto: CreateGenderFemaleDto): Promise<GenderFemale> {
    const genderFemale = this.genderFemaleRepository.create(createDto);
    return this.genderFemaleRepository.save(genderFemale);
  }

  async update(id: number, updateDto: UpdateGenderFemaleDto): Promise<GenderFemale> {
    await this.findOne(id); // Verify exists first
    await this.genderFemaleRepository.update(id, updateDto);
    return this.genderFemaleRepository.findOneBy({ id }) as Promise<GenderFemale>;
  }

  async remove(id: number): Promise<void> {
    const result = await this.genderFemaleRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`GenderFemale with ID ${id} not found`);
    }
  }
}