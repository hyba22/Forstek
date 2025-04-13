import { IsNotEmpty, IsString } from 'class-validator';

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  aspect: string;

  @IsString()
  @IsNotEmpty()
  name: string;
}