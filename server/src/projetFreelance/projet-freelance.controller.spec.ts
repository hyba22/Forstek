import { Test, TestingModule } from '@nestjs/testing';
import { ProjetFreelanceController } from './projet-freelance.controller';

describe('ProjetFreelanceController', () => {
  let controller: ProjetFreelanceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProjetFreelanceController],
    }).compile();

    controller = module.get<ProjetFreelanceController>(ProjetFreelanceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
