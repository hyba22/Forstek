import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateRevenueDto } from './dto/create-revenue.dto';
import { UpdateRevenueDto } from './dto/update-revenue.dto';
import { RevenueService } from './revenue.service';
  
  @Controller('revenue')
  export class RevenueController {
    constructor(private readonly revenueService: RevenueService) {}
  
    @Get()
    findAll() {
      return this.revenueService.findAll();
    }
  
    @Get('chart')
    getChartData() {
      return this.revenueService.getChartData();
    }
  
    @Post()
    create(@Body() createRevenueDto: CreateRevenueDto) {
      return this.revenueService.create(createRevenueDto);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.revenueService.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateRevenueDto: UpdateRevenueDto) {
      return this.revenueService.update(+id, updateRevenueDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.revenueService.remove(+id);
    }
  }