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
import { ActivityService } from './activity.service';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Activity } from './entities/activity.entity';
  
  @Controller('activities')
  export class ActivityController {
    constructor(private readonly activityService: ActivityService) {}
  
    @Post()
    async create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
      return this.activityService.create(createActivityDto);
    }
  
    @Get()
    async findAll(): Promise<Activity[]> {
      return this.activityService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Activity> {
      return this.activityService.findOne(id);
    }
  
    @Put(':id')
    async update(
      @Param('id', ParseIntPipe) id: number,
      @Body() updateActivityDto: UpdateActivityDto,
    ): Promise<Activity> {
      return this.activityService.update(id, updateActivityDto);
    }
  
    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
      return this.activityService.remove(id);
    }
  }