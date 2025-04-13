import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { GenderMale } from './entities/gender-male.entity';
import { GenderMaleService } from './gender-male.service';
import { CreateGenderMaleDto, UpdateGenderMaleDto } from './dto/gender-male.dto';
  
  @Controller('gender-male')
  export class GenderMaleController {
    constructor(private readonly genderMaleService: GenderMaleService) {}
  
    @Post()
    async create(
      @Body() createGenderMaleDto: CreateGenderMaleDto,
    ): Promise<GenderMale> {
      return this.genderMaleService.create(createGenderMaleDto);
    }
  
    @Get()
    async findAll(): Promise<GenderMale[]> {
      return this.genderMaleService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<GenderMale> {
      return this.genderMaleService.findOne(+id);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateGenderMaleDto: UpdateGenderMaleDto,
    ): Promise<GenderMale> {
      return this.genderMaleService.update(+id, updateGenderMaleDto);
    }
  
    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
      return this.genderMaleService.remove(+id);
    }
  }