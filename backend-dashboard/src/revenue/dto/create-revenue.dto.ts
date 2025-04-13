import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRevenueDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;
}