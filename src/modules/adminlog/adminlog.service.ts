import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WebhookLog } from './entities/adminlog.entity';
import { Repository } from 'typeorm';
import { WebhookLogService } from '@/modules/webhooklog/webhooklog.service';

@Injectable()
export class AdminlogService {
  constructor(
    @InjectRepository(WebhookLog)
    private webhookRepository: Repository<WebhookLog>,
    private webhookLogService: WebhookLogService,
  ) {}

  async findAll() {
    const query = `
        SELECT wl.*, w.uuid AS webhook_uuid, s.uuid AS sale_uuid
  FROM webhook_logs wl
  JOIN webhooks w ON wl.webhook_id = w.id
  JOIN sales s ON wl.sale_id = s.id
    `;
    const results = await this.webhookRepository.query(query);
    results.forEach(async (result) => {
      const response = await this.webhookLogService.create({
        webhookId: result.webhook_id,
        saleId: result.sale_id,
        webhookUuid: result.webhook_uuid,
        saleUuid: result.sale_uuid,
        event: result.event,
        url: result.url,
        sentData: result.sent_data,
        responseData: result.response_data,
        responseStatus: result.response_status,
        createdAt: result.created_at,
        updatedAt: result.updated_at,
      });
      console.log('WebhookLog created: response - ', response.id);
      console.log('--------------------------------------------');
    });
    return results;
  }
}
