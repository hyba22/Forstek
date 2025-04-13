import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFundingDto } from './dto/create-funding.dto';
import { UpdateFundingDto } from './dto/update-funding.dto';
import { Funding } from './entities/funding.entity';

@Injectable()
export class FundingService {
  constructor(
    @InjectRepository(Funding)
    private fundingRepository: Repository<Funding>,
  ) {}

  findAll(): Promise<Funding[]> {
    return this.fundingRepository.find();
  }

  create(createFundingDto: CreateFundingDto): Promise<Funding> {
    const funding = this.fundingRepository.create(createFundingDto);
    return this.fundingRepository.save(funding);
  }

  async findOne(id: number): Promise<Funding> {
    const funding = await this.fundingRepository.findOneBy({ id });
    if (!funding) {
      throw new NotFoundException(`Funding with ID ${id} not found`);
    }
    return funding;
  }

  async update(id: number, updateFundingDto: UpdateFundingDto): Promise<Funding> {
    await this.fundingRepository.update(id, updateFundingDto);
    const updatedFunding = await this.fundingRepository.findOneBy({ id });
    
    if (!updatedFunding) {
      throw new NotFoundException(`Funding with ID ${id} not found`);
    }
    
    return updatedFunding;
  }

  async remove(id: number): Promise<void> {
    const result = await this.fundingRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Funding with ID ${id} not found`);
    }
  }

  async getChartData() {
    const allFundings = await this.findAll();
    return {
      labels: allFundings.map(item => item.source),
      data: allFundings.map(() => Math.floor(Math.random() * 100)),
    };
  }
}