import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Event } from '../constants/webhook.constants'; // Adjust the path as necessary

export class CreateWebhookLogDto {
  @IsOptional()
  @IsNumber()
  webhookId?: number | null;

  @IsOptional()
  @IsNumber()
  saleId?: number | null;

  @IsNotEmpty()
  @IsString()
  event: Event;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsObject()
  @Type(() => Object)
  sentData: Record<string, any>;

  @IsOptional()
  @IsObject()
  @Type(() => Object)
  responseData?: Record<string, any> | null;

  @IsOptional()
  @IsNumber()
  responseStatus?: number | null;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  createdAt?: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  updatedAt?: Date | null;
}
