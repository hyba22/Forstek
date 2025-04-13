// src/market-share/market-share.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMarketShareDto } from './dto/create-market-share.dto';
import { UpdateMarketShareDto } from './dto/update-market-share.dto';
import { MarketShare } from './entities/market-share.entity';

@Injectable()
export class MarketShareService {
  constructor(
    @InjectRepository(MarketShare)
    private marketShareRepository: Repository<MarketShare>,
  ) {}

  async create(createMarketShareDto: CreateMarketShareDto): Promise<MarketShare> {
    const marketShare = this.marketShareRepository.create(createMarketShareDto);
    return this.marketShareRepository.save(marketShare);
  }

  async findAll(): Promise<MarketShare[]> {
    return this.marketShareRepository.find();
  }

  async findOne(id: number): Promise<MarketShare> {
    const marketShare = await this.marketShareRepository.findOneBy({ id });
    if (!marketShare) {
      throw new NotFoundException(`MarketShare with ID ${id} not found`);
    }
    return marketShare;
  }

  async update(id: number, updateMarketShareDto: UpdateMarketShareDto): Promise<MarketShare> {
    const result = await this.marketShareRepository.update(id, updateMarketShareDto);
    if (result.affected === 0) {
      throw new NotFoundException(`MarketShare with ID ${id} not found`);
    }
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.marketShareRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`MarketShare with ID ${id} not found`);
    }
  }

  async getChartData() {
    const data = await this.findAll();
    return {
      labels: data.map(item => item.label),
      datasets: [{
        label: 'Indicateur',
        data: data.map(item => item.value),
        borderColor: 'rgba(128, 0, 128, 1)',
        backgroundColor: 'rgba(128, 0, 128, 0.2)',
        borderWidth: 2,
        tension: 0.1
      }]
    };
  }
}