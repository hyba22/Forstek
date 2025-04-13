import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { Revenue } from './entities/revenue.entity';

@Injectable()
export class RevenueService {
  constructor(
    @InjectRepository(Revenue)
    private revenueRepository: Repository<Revenue>,
  ) {}

  async findAll(): Promise<Revenue[]> {
    return this.revenueRepository.find();
  }

  async create(createRevenueDto: CreateRevenueDto): Promise<Revenue> {
    const revenue = this.revenueRepository.create(createRevenueDto);
    return this.revenueRepository.save(revenue);
  }

  async findOne(id: number): Promise<Revenue> {
    const revenue = await this.revenueRepository.findOneBy({ id });
    if (!revenue) {
      throw new NotFoundException(`Revenue with ID ${id} not found`);
    }
    return revenue;
  }

  async update(id: number, updateRevenueDto: UpdateRevenueDto): Promise<Revenue> {
    await this.revenueRepository.update(id, updateRevenueDto);
    const updatedRevenue = await this.revenueRepository.findOneBy({ id });
    
    if (!updatedRevenue) {
      throw new NotFoundException(`Revenue with ID ${id} not found`);
    }
    
    return updatedRevenue;
  }

  async remove(id: number): Promise<void> {
    const result = await this.revenueRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Revenue with ID ${id} not found`);
    }
  }

  async getChartData() {
    const allRevenues = await this.findAll();
    const totalAmount = allRevenues.reduce((acc, item) => acc + item.amount, 0);

    return {
      data: allRevenues.map(item => ({
        name: item.name,
        amount: item.amount,
        percentage: (item.amount / totalAmount) * 100
      })),
      totalAmount
    };
  }
}