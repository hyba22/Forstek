import { Test, TestingModule } from '@nestjs/testing';
import { GenderFemaleService } from './gender-female.service';

describe('GenderFemaleService', () => {
  let service: GenderFemaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenderFemaleService],
    }).compile();

    service = module.get<GenderFemaleService>(GenderFemaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
