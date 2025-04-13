import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from '@nestjs/common';
import { CreateMaturityLevelDto } from './dto/create-maturity-level.dto';
import { UpdateMaturityLevelDto } from './dto/update-maturity-level.dto';
import { MaturityLevelService } from './maturity-level.service';
import { MaturityLevel } from './entities/maturity-level.entity';
  
  @Controller('maturity-levels')
  export class MaturityLevelController {
    constructor(private readonly maturityLevelService: MaturityLevelService) {}
  
    @Post()
    async create(@Body() createMaturityLevelDto: CreateMaturityLevelDto): Promise<MaturityLevel> {
      return this.maturityLevelService.create(createMaturityLevelDto);
    }
  
    @Get()
    async findAll(): Promise<MaturityLevel[]> {
      return this.maturityLevelService.findAll();
    }
  
    @Get('chart')
    async getChartData() {
      return this.maturityLevelService.getChartData();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<MaturityLevel> {
      return this.maturityLevelService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateMaturityLevelDto: UpdateMaturityLevelDto,
    ): Promise<MaturityLevel> {
      return this.maturityLevelService.update(id, updateMaturityLevelDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.maturityLevelService.remove(id);
    }
  }