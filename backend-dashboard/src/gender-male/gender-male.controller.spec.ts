import { Test, TestingModule } from '@nestjs/testing';
import { GenderMaleController } from './gender-male.controller';

describe('GenderMaleController', () => {
  let controller: GenderMaleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GenderMaleController],
    }).compile();

    controller = module.get<GenderMaleController>(GenderMaleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
