import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Event } from '../constants/webhook.constants';
import { Webhook } from '../types/webhook.types';
import { Sale } from '../types/sale.types';

export type WebhookLogDocument = Document & WebhookLog;

@Schema()
export class WebhookLog {
  @Prop({ type: MongooseSchema.Types.Mixed, required: true })
  webhook: Webhook;

  @Prop({ type: MongooseSchema.Types.Mixed, required: false })
  sale?: Sale;

  @Prop({ required: true, Type: Event })
  event: Event;

  @Prop({ required: true })
  url: string;

  @Prop({ required: true, type: MongooseSchema.Types.Mixed })
  sentData: Record<string, object>;

  @Prop({ type: MongooseSchema.Types.Mixed, default: null })
  responseData?: Record<string, object> | null;

  @Prop({ type: Number, default: null })
  responseStatus?: number | null;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: null })
  updatedAt?: Date | null;
}

export const WebhookLogSchema = SchemaFactory.createForClass(WebhookLog);

WebhookLogSchema.index({ webhookId: 1 });
WebhookLogSchema.index({ saleUuid: 1, createdAt: -1 });
WebhookLogSchema.index({ saleId: 1 });
WebhookLogSchema.index({ createdAt: -1 });
