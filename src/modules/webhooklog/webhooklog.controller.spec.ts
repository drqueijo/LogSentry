import { Test, TestingModule } from '@nestjs/testing';
import { WebhookLogController } from './webhooklog.controller';
import { WebhookLogService } from './webhooklog.service';

describe('WebhookLogController', () => {
  let controller: WebhookLogController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebhookLogController],
      providers: [WebhookLogService],
    }).compile();

    controller = module.get<WebhookLogController>(WebhookLogController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
