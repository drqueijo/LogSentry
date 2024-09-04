import { ValidationPipe } from '@nestjs/common';

export const ValidationPipeConfig = new ValidationPipe({
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: false,
});
