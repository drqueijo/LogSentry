import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsObject,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { Event } from '../constants/webhook.constants';
import { WebhookDto } from './webhook.dto';
import { SaleDto } from './sale.dto';

export class CreateWebhookLogDto {
  @IsNotEmpty()
  @IsObject()
  @Type(() => WebhookDto)
  @ValidateNested()
  webhook: WebhookDto;

  @IsOptional()
  @IsObject()
  @Type(() => SaleDto)
  @ValidateNested()
  sale?: SaleDto;

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
