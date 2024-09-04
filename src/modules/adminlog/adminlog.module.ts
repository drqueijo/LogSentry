import { Logger, Module } from '@nestjs/common';
import { AdminlogService } from './adminlog.service';
import { AdminlogController } from './adminlog.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WebhookLog } from './entities/adminlog.entity';
import { WebhookLogModule } from '@/modules/webhooklog/webhooklog.module'; // Import the module containing WebhookLogService

@Module({
  imports: [
    TypeOrmModule.forFeature([WebhookLog]),
    WebhookLogModule, // Import the module
  ],
  controllers: [AdminlogController],
  providers: [AdminlogService, Logger],
})
export class AdminlogModule {}
