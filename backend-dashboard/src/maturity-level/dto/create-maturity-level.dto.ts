import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateMaturityLevelDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @Min(0)
  @Max(100)
  percentage: number;
}