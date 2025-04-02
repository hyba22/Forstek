import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Offre } from './offre.entity';
import { CreateOffreDto } from './dto/offre.dto';
import { UpdateOffreDto } from './dto/updateOffre.dto';
import { OffreService } from './offre.service';


@Controller('offres')
export class OffresController {
  constructor(private readonly offresService: OffreService) {}

  @Post()
  create(@Body() createOffreDto: CreateOffreDto) {
    return this.offresService.create(createOffreDto);
  }

  @Get()
  findAll() {
    return this.offresService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.offresService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOffreDto: UpdateOffreDto) {
    return this.offresService.update(+id, updateOffreDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.offresService.remove(+id);
  }
}