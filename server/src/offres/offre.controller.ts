import { Controller, Get, Post, Body } from '@nestjs/common';
import { OffreService } from './offre.service';
import { CreateOffreDto } from './dto/offre.dto';
import { Offre } from './offre.entity';

@Controller('offres')
export class OffreController {
  constructor(private readonly offresService: OffreService) {}

  @Post()
  create(@Body() createOffreDto: CreateOffreDto): Promise<Offre> {
    return this.offresService.create(createOffreDto);
  }

  @Get()
  findAll(): Promise<Offre[]> {
    return this.offresService.findAll();
  }
}
