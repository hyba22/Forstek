import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Deposeprojet } from './deposeprojet.entity';
import { CreateDeposeProjetDto } from './dto/deposeprojet.dto';
import { UpdateDeposeProjetDto } from './dto/updateDeposeProjet.dto';
import { DeposeprojetService } from './deposeprojet.service';


@Controller('deposeprojet')
export class DeposeprojetController {
  constructor(private readonly deposeprojetService: DeposeprojetService) {}

  @Post()
  create(@Body() createDeposeProjetDto: CreateDeposeProjetDto) {
    return this.deposeprojetService.create(createDeposeProjetDto);
  }

  @Get()
  findAll() {
    return this.deposeprojetService.findAll();
  }

  @Get(':iddeposeprojet')
  findOne(@Param('iddeposeprojet') iddeposeprojet: number) {
    return this.deposeprojetService.findOne(+iddeposeprojet);
  }

  @Patch(':iddeposeprojet')
  update(@Param('iddeposeprojet') iddeposeprojet: number, @Body() updateDeposeProjetDto: UpdateDeposeProjetDto) {
    return this.deposeprojetService.update(+iddeposeprojet, updateDeposeProjetDto);
  }

  @Delete(':iddeposeprojet')
  remove(@Param('iddeposeprojet') iddeposeprojet: number) {
    return this.deposeprojetService.remove(+iddeposeprojet);
  }
}