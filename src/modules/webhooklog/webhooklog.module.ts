import { Module } from '@nestjs/common';
import { WebhookLogService } from './webhooklog.service';
import { WebhookLogController } from './webhooklog.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookLog, WebhookLogSchema } from './schemas/webhooklog.schema';
import { PaginationService } from '@/modules/pagination/pagination.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: WebhookLog.name, schema: WebhookLogSchema },
    ]),
  ],
  controllers: [WebhookLogController],
  providers: [WebhookLogService, PaginationService],
  exports: [WebhookLogService],
})
export class WebhookLogModule {}
