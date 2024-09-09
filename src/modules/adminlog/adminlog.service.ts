import { Inject, Injectable, Logger } from '@nestjs/common';
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
    private logger: Logger,
  ) {}

  async findAll() {
    const query = `
SELECT 
    wl.id, 
    wl.webhook_id, 
    wl.sale_id,
    wl.event, 
    wl.url, 
    wl.sent_data, 
    wl.response_data, 
    wl.response_status, 
    wl.created_at, 
    wl.updated_at,
    w.uuid AS webhook_uuid,
    w.token AS webhook_token,
    w.plan_code AS webhook_plan_code,
    w.id AS webhook_id, 
    w.name AS webhook_name,
    w.user_id AS webhook_user_id,
    w.company_id AS webhook_company_id,
    w.product_id AS webhook_product_id,
    s.uuid AS sale_uuid, 
    s.id AS sale_id, 
    s.code AS sale_code
FROM 
    webhook_logs wl
LEFT JOIN 
    webhooks w ON wl.webhook_id = w.id
LEFT JOIN 
    sales s ON wl.sale_id = s.id
ORDER BY 
    wl.created_at DESC;
    `;
    const results = await this.webhookRepository.query(query);
    results.forEach(async (result) => {
      const response = await this.webhookLogService.create({
        sale: {
          uuid: result.sale_uuid,
          id: result.sale_id,
          code: result.sale_code,
        },
        webhook: {
          uuid: result.webhook_uuid,
          id: result.webhook_id,
          name: result.webhook_name,
          userId: result.webhook_user_id,
          companyId: result.webhook_company_id,
          productId: result.webhook_product_id,
        },
        token: result.webhook_token,
        planCode: result.webhook_plan_code,
        event: result.event,
        url: result.url,
        sentData: result.sent_data,
        responseData: result.response_data,
        responseStatus: result.response_status,
        createdAt: result.created_at,
        updatedAt: result.updated_at,
      });
      this.logger.log('WebhookLog created: response - ', response.id);
    });
    return results;
  }
}
