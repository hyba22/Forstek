import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjetFreelanceService } from './projet-freelance.service';
import { CreateProjetFreelanceDto } from './dto/CreateProjetFreelance.dto';
import { UpdateProjetFreelanceDto } from './dto/UpdateProjetFreelance.dto';
import { ProjetFreelance } from './projetFreelance.entity';

@Controller('projet-freelance')
export class ProjetFreelanceController {
  constructor(private readonly projetFreelanceService: ProjetFreelanceService) {}

  @Post()
  async create(@Body() createDto: CreateProjetFreelanceDto): Promise<ProjetFreelance> {
    return this.projetFreelanceService.create(createDto);
  }

  @Get()
  async findAll(): Promise<ProjetFreelance[]> {
    return this.projetFreelanceService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProjetFreelance> {
    return this.projetFreelanceService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDto: UpdateProjetFreelanceDto,
  ): Promise<ProjetFreelance> {
    return this.projetFreelanceService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.projetFreelanceService.remove(id);
  }

  @Get('by-email/:email')
  async findByEmail(@Param('email') email: string): Promise<ProjetFreelance> {
    return this.projetFreelanceService.findByEmail(email);
  }
}