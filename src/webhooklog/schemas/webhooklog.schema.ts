import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Event } from '../constants/webhook.constants';

export type WebhookLogDocument = Document & WebhookLog;

@Schema()
export class WebhookLog {
  @Prop({ type: Number, default: null })
  webhookId?: number | null;

  @Prop({ type: Number, default: null })
  saleId?: number | null;

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
WebhookLogSchema.index({ saleId: 1 });
WebhookLogSchema.index({ event: 1 });
WebhookLogSchema.index({ createdAt: -1 });
