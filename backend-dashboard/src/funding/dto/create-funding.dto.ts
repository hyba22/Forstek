import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFundingDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  description: string;
}