// src/market-share/market-share.controller.ts
import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { MarketShareService } from './market-share.service';
import { CreateMarketShareDto } from './dto/create-market-share.dto';
import { UpdateMarketShareDto } from './dto/update-market-share.dto';

@Controller('market-share')
export class MarketShareController {
  constructor(private readonly marketShareService: MarketShareService) {}

  @Post()
  create(@Body() createMarketShareDto: CreateMarketShareDto) {
    return this.marketShareService.create(createMarketShareDto);
  }

  @Get()
  findAll() {
    return this.marketShareService.findAll();
  }

  @Get('chart')
  getChartData() {
    return this.marketShareService.getChartData();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.marketShareService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMarketShareDto: UpdateMarketShareDto) {
    return this.marketShareService.update(+id, updateMarketShareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.marketShareService.remove(+id);
  }
}