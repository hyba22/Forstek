import { IsDate, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class CreateEvaluationDto {
  @IsInt()
  projectId: number; // ID du projet/startup évalué

  @IsInt()
  partnerId: number; // ID du partenaire évaluateur

  @IsInt()
  @Min(0)
  @Max(100)
  score: number; // Note globale sur 100

  @IsString()
  @IsOptional()
  comments?: string; // Commentaires d'évaluation

  @IsDate()
  date: Date; // Date de l'évaluation

  // Critères d'évaluation avec système d'étoiles (1-5)
  @IsInt()
  @Min(1)
  @Max(5)
  innovationStars: number; // Innovation (1-5 étoiles)

  @IsInt()
  @Min(1)
  @Max(5)
  marketPotentialStars: number; // Potentiel marché (1-5 étoiles)

  @IsInt()
  @Min(1)
  @Max(5)
  teamStars: number; // Équipe (1-5 étoiles)

  @IsInt()
  @Min(1)
  @Max(5)
  feasibilityStars: number; // Faisabilité (1-5 étoiles)

  @IsInt()
  @Min(1)
  @Max(5)
  overallStars: number; // Note globale en étoiles
}