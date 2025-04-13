import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
} from '@nestjs/common';
import { CreateEvaluationDto } from './dto/create-evaluation.dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/create-evaluation.dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity/evaluation.entity';
import { EvaluationService } from './evaluation.service';

  @Controller('evaluations')
  export class EvaluationController {
    constructor(private readonly evaluationService: EvaluationService) {}
  
    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() createEvaluationDto: CreateEvaluationDto): Promise<Evaluation> {
      return this.evaluationService.create(createEvaluationDto);
    }
  
    @Get()
    async findAll(): Promise<Evaluation[]> {
      return this.evaluationService.findAll();
    }
  
    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Evaluation> {
      return this.evaluationService.findOne(+id);
    }
  
    @Get('project/:projectId')
    async findByProject(@Param('projectId') projectId: string): Promise<Evaluation[]> {
      return this.evaluationService.findByProject(+projectId);
    }
  
    @Put(':id')
    async update(
      @Param('id') id: string,
      @Body() updateEvaluationDto: UpdateEvaluationDto,
    ): Promise<Evaluation> {
      return this.evaluationService.update(+id, updateEvaluationDto);
    }
  
    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Param('id') id: string): Promise<void> {
      return this.evaluationService.remove(+id);
    }
  
    @Get('stats/project-average/:projectId')
    async getProjectAverage(@Param('projectId') projectId: string) {
      const average = await this.evaluationService.getProjectAverage(+projectId);
      return {
        status: HttpStatus.OK,
        data: average,
      };
    }
  
    @Get('check-evaluation')
    async hasPartnerEvaluated(
      @Query('partnerId') partnerId: string,
      @Query('projectId') projectId: string,
    ) {
      const hasEvaluated = await this.evaluationService.hasPartnerEvaluated(
        +partnerId,
        +projectId,
      );
      return {
        status: HttpStatus.OK,
        data: { hasEvaluated },
      };
    }
  }