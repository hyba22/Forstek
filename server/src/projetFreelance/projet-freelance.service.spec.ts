import { Test, TestingModule } from '@nestjs/testing';
import { ProjetFreelanceService } from './projet-freelance.service';

describe('ProjetFreelanceService', () => {
  let service: ProjetFreelanceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProjetFreelanceService],
    }).compile();

    service = module.get<ProjetFreelanceService>(ProjetFreelanceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
