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
import { DashboardService } from './dashboard.service';
import { UpdateDashboardDto } from './dto/update-dashboard.dto';
import { CreateDashboardDto } from './dto/dashboard.dto';
  
  @Controller('dashboard')
  export class DashboardController {
    constructor(private readonly dashboardService: DashboardService) {}
  
    @Post()
    create(@Body() createDashboardDto: CreateDashboardDto) {
      return this.dashboardService.create(createDashboardDto);
    }
  
    @Get()
    findAll() {
      return this.dashboardService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.dashboardService.findOne(id);
    }
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateDashboardDto: UpdateDashboardDto
    ) {
      return this.dashboardService.update(id, updateDashboardDto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.dashboardService.remove(id);
    }
  
    @Get('boxes')
    getDashboardBoxes() {
      return this.dashboardService.getDashboardData();
    }
  }