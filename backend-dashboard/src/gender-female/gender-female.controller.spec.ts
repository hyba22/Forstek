import { Test, TestingModule } from '@nestjs/testing';
import { GenderFemaleController } from './gender-female.controller';

describe('GenderFemaleController', () => {
  let controller: GenderFemaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderFemaleController],
    }).compile();

    controller = module.get<GenderFemaleController>(GenderFemaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
