import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WebhookLogModule } from './webhooklog/webhooklog.module';

const getEnv = (key: string): string => {
  const value = process.env[key];
  console.log(process.env[key]);
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    WebhookLogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
