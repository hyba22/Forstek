import { Test, TestingModule } from '@nestjs/testing';
import { DeposeprojetController } from './deposeprojet.controller';

describe('DeposeprojetController', () => {
  let controller: DeposeprojetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DeposeprojetController],
    }).compile();

    controller = module.get<DeposeprojetController>(DeposeprojetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
