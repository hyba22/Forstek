// update-maturity-level.dto.ts
import { PartialType } from '@nestjs/mapped-types';
import { CreateMaturityLevelDto } from './create-maturity-level.dto';

export class UpdateMaturityLevelDto extends PartialType(CreateMaturityLevelDto) {}