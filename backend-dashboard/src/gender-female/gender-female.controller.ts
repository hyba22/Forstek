import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';

import { GenderFemaleService } from './gender-female.service';
import { GenderFemale } from './entities/gender-female.entity';
import { CreateGenderFemaleDto, UpdateGenderFemaleDto } from './dto/gender-female.dto';

@Controller('gender-female')
export class GenderFemaleController {
  constructor(private readonly genderFemaleService: GenderFemaleService) {}

  @Get()
  findAll(): Promise<GenderFemale[]> {
    return this.genderFemaleService.findAll();
  }

  @Post()
  create(@Body() createDto: CreateGenderFemaleDto): Promise<GenderFemale> {
    return this.genderFemaleService.create(createDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateGenderFemaleDto,
  ): Promise<GenderFemale> {
    return this.genderFemaleService.update(+id, updateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.genderFemaleService.remove(+id);
  }
}