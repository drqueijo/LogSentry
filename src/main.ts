import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipeConfig } from '@/config/validation-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(ValidationPipeConfig);
  await app.listen(process.env.PORT);
}
bootstrap();
