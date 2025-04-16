import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEvaluationDto } from './dto/create-evaluation.dto/create-evaluation.dto';
import { UpdateEvaluationDto } from './dto/create-evaluation.dto/update-evaluation.dto';
import { Evaluation } from './entities/evaluation.entity/evaluation.entity';


@Injectable()
export class EvaluationService {
  constructor(
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
  ) {}

  // CREATE - Créer une nouvelle évaluation
  async create(createEvaluationDto: CreateEvaluationDto): Promise<Evaluation> {
    // Convertir les étoiles en score sur 100
    const score = (createEvaluationDto.overallStars * 20); // 5 étoiles = 100 points
    
    const evaluation = this.evaluationRepository.create({
      ...createEvaluationDto,
      score,
    });
    
    const savedEvaluation = await this.evaluationRepository.save(evaluation);
    
  
    await this.evaluationRepository.update(savedEvaluation.id, {
      notificationSent: true,
    });
    
    return savedEvaluation;
  }

  // READ - Récupérer toutes les évaluations
  async findAll(): Promise<Evaluation[]> {
    return this.evaluationRepository.find({
      order: { date: 'DESC' }, // Tri par date décroissante
    });
  }

  // READ - Récupérer une évaluation par ID
  async findOne(id: number): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.findOne({ 
      where: { id },
      relations: ['project', 'partner'], // Optionnel: charger les relations
    });

    if (!evaluation) {
      throw new NotFoundException(`Évaluation avec l'ID ${id} non trouvée`);
    }

    return evaluation;
  }

  // READ - Récupérer les évaluations d'un projet spécifique
  async findByProject(projectId: number): Promise<Evaluation[]> {
    return this.evaluationRepository.find({
      where: { projectId },
      order: { date: 'DESC' },
    });
  }

  // UPDATE - Mettre à jour une évaluation
  async update(
    id: number,
    updateEvaluationDto: UpdateEvaluationDto,
  ): Promise<Evaluation> {
    const evaluation = await this.evaluationRepository.preload({
      id,
      ...updateEvaluationDto,
      // Recalculer le score si overallStars est modifié
      ...(updateEvaluationDto.overallStars && {
        score: updateEvaluationDto.overallStars * 20,
      }),
    });

    if (!evaluation) {
      throw new NotFoundException(`Évaluation avec l'ID ${id} non trouvée`);
    }

    const updatedEvaluation = await this.evaluationRepository.save(evaluation);

    // Renvoyer une notification si c'est la première évaluation
    if (!updatedEvaluation.notificationSent) {
      await this.evaluationRepository.update(id, { notificationSent: true });
    }

    return updatedEvaluation;
  }

  // DELETE - Supprimer une évaluation
  async remove(id: number): Promise<void> {
    const result = await this.evaluationRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Évaluation avec l'ID ${id} non trouvée`);
    }
  }

  // Méthodes supplémentaires utiles

  // Calculer la moyenne des évaluations pour un projet
  async getProjectAverage(projectId: number): Promise<{ overall: number }> {
    const result = await this.evaluationRepository
      .createQueryBuilder('evaluation')
      .select('AVG(evaluation.overallStars)', 'overall')
      .where('evaluation.projectId = :projectId', { projectId })
      .getRawOne();

    return {
      overall: parseFloat(result.overall) || 0,
    };
  }

  // Vérifier si un partenaire a déjà évalué un projet
  async hasPartnerEvaluated(
    partnerId: number,
    projectId: number,
  ): Promise<boolean> {
    const count = await this.evaluationRepository.count({
      where: { partnerId, projectId },
    });

    return count > 0;
  }
}