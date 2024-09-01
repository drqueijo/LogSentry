import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
  IsDate,
  IsUUID,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Event } from '../constants/webhook.constants'; // Adjust the path as necessary

export class CreateWebhookLogDto {
  @IsNotEmpty()
  @IsNumber()
  webhookId?: number | null;

  @IsOptional()
  @IsUUID()
  webhookUuid?: string | null;

  @IsOptional()
  @IsString()
  webhookName?: string | null;

  @IsNotEmpty()
  @IsNumber()
  saleId?: number | null;

  @IsOptional()
  @IsUUID()
  saleUuid?: string | null;

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

  @IsNotEmpty()
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
