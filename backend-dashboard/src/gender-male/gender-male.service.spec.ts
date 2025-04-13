import { Test, TestingModule } from '@nestjs/testing';
import { GenderMaleService } from './gender-male.service';

describe('GenderMaleService', () => {
  let service: GenderMaleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GenderMaleService],
    }).compile();

    service = module.get<GenderMaleService>(GenderMaleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
