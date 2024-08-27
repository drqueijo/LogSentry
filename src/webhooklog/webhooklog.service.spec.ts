import { Test, TestingModule } from '@nestjs/testing';
import { WebhookLogService } from './webhooklog.service';

describe('WebhookLogService', () => {
  let service: WebhookLogService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebhookLogService],
    }).compile();

    service = module.get<WebhookLogService>(WebhookLogService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
