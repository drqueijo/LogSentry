import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookLogModule } from '@module/webhooklog/webhooklog.module';
import { PaginationService } from '@module/pagination/pagination.service';
import { AdminlogModule } from '@module/adminlog/adminlog.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LogMiddleware } from '@middleware/log.middleware';
import { ConfigModuleConfig, MongoDbConfig, TypeOrmConfig } from '@/config';

@Module({
  imports: [
    ConfigModule.forRoot(ConfigModuleConfig),
    TypeOrmModule.forRootAsync(TypeOrmConfig),
    MongooseModule.forRootAsync(MongoDbConfig),
    WebhookLogModule,
    AdminlogModule,
  ],
  controllers: [],
  providers: [PaginationService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LogMiddleware).forRoutes('*');
  }
}
