import { Test, TestingModule } from '@nestjs/testing';
import { MaturityLevelController } from './maturity-level.controller';

describe('MaturityLevelController', () => {
  let controller: MaturityLevelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MaturityLevelController],
    }).compile();

    controller = module.get<MaturityLevelController>(MaturityLevelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
