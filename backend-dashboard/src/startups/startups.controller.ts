import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateStartupDto } from './dto/create-startup.dto';
import { UpdateStartupDto } from './dto/update-startup.dto';
import { StartupsService } from './startups.service';

@Controller('startups')
export class StartupsController {
  constructor(private readonly startupsService: StartupsService) {}

  @Post()
  create(@Body() createStartupDto: CreateStartupDto) {
    return this.startupsService.create(createStartupDto);
  }

  @Get()
  findAll() {
    return this.startupsService.findAll();
  }

  @Get('stats')
  getStats() {
    return this.startupsService.getDurationStats();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.startupsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateStartupDto: UpdateStartupDto) {
    return this.startupsService.update(+id, updateStartupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.startupsService.remove(+id);
  }
}