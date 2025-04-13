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
import { CreateInnovationDto } from './dto/create-innovation.dto';
import { UpdateInnovationDto } from './dto/update-innovation.dto';
import { Innovation } from './entities/innovation.entity';
import { InnovationService } from './innovation.service';
  
  @Controller('innovations')
  export class InnovationController {
    constructor(private readonly innovationService: InnovationService) {}
  
    @Post()
    async create(@Body() createInnovationDto: CreateInnovationDto): Promise<Innovation> {
      return this.innovationService.create(createInnovationDto);
    }
  
    @Get()
    async findAll(): Promise<Innovation[]> {
      return this.innovationService.findAll();
    }
  
    @Get('chart')
    async getChartData() {
      return this.innovationService.getChartData();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Innovation> {
      return this.innovationService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateInnovationDto: UpdateInnovationDto,
    ): Promise<Innovation> {
      return this.innovationService.update(id, updateInnovationDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.innovationService.remove(id);
    }
  }