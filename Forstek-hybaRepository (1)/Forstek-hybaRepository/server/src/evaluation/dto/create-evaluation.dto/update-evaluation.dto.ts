import { IsInt, IsOptional, IsString, Max, Min } from 'class-validator';

export class UpdateEvaluationDto {
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  overallStars?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  innovationStars?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  marketPotentialStars?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  teamStars?: number;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  feasibilityStars?: number;

  @IsOptional()
  @IsString()
  comments?: string;
}