import { Injectable } from '@nestjs/common';
import { CreateWebhookLogDto } from './dto/create-webhooklog.dto';
import { UpdateWebhookLogDto } from './dto/update-webhooklog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WebhookLog, WebhookLogDocument } from './schemas/webhooklog.schema';
import { Model } from 'mongoose';

@Injectable()
export class WebhookLogService {
  constructor(
    @InjectModel(WebhookLog.name)
    private webhookLogModel: Model<WebhookLogDocument>,
  ) {}

  create(createWebhookLogDto: CreateWebhookLogDto) {
    const createdWebhookLog = new this.webhookLogModel(createWebhookLogDto);
    return createdWebhookLog.save();
  }

  findAll() {
    return this.webhookLogModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} webhooklog`;
  }

  update(id: number, updateWebhookLogDto: UpdateWebhookLogDto) {
    return `This action updates a #${id} webhooklog`;
  }

  remove(id: number) {
    return `This action removes a #${id} webhooklog`;
  }
}
