import { Test, TestingModule } from '@nestjs/testing';
import { DeposeprojetService } from './deposeprojet.service';

describe('DeposeprojetService', () => {
  let service: DeposeprojetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DeposeprojetService],
    }).compile();

    service = module.get<DeposeprojetService>(DeposeprojetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
