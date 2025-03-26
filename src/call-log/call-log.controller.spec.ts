import { Test, TestingModule } from '@nestjs/testing';
import { CallLogController } from './call-log.controller';

describe('CallLogController', () => {
  let controller: CallLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CallLogController],
    }).compile();

    controller = module.get<CallLogController>(CallLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
