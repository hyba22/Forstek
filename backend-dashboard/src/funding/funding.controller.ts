import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';
import { CreateFundingDto } from './dto/create-funding.dto';
import { UpdateFundingDto } from './dto/update-funding.dto';
import { FundingService } from './funding.service';
  
  @Controller('funding')
  export class FundingController {
    constructor(private readonly fundingService: FundingService) {}
  
    @Get()
    findAll() {
      return this.fundingService.findAll();
    }
  
    @Get('chart')
    getChartData() {
      return this.fundingService.getChartData();
    }
  
    @Post()
    create(@Body() createFundingDto: CreateFundingDto) {
      return this.fundingService.create(createFundingDto);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.fundingService.findOne(+id);
    }
  
    @Put(':id')
    update(@Param('id') id: string, @Body() updateFundingDto: UpdateFundingDto) {
      return this.fundingService.update(+id, updateFundingDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.fundingService.remove(+id);
    }
  }