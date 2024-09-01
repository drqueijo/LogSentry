import { Injectable } from '@nestjs/common';
import { CreateWebhookLogDto } from './dto/create-webhooklog.dto';
import { UpdateWebhookLogDto } from './dto/update-webhooklog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WebhookLog, WebhookLogDocument } from './schemas/webhooklog.schema';
import { Model } from 'mongoose';
import { PageOptionsDto } from '@/modules/pagination/dto/pageoptions.dto';
import { PaginationService } from '@/modules/pagination/pagination.service';
import { PageDto } from '@/modules/pagination/dto/page.dto';
import { PageMetaDto } from '@/modules/pagination/meta/page.meta';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';

@Injectable()
export class WebhookLogService {
  constructor(
    @InjectModel(WebhookLog.name)
    private webhookLogModel: Model<WebhookLogDocument>,
    private paginationService: PaginationService,
  ) {}

  create(createWebhookLogDto: CreateWebhookLogDto) {
    const createdWebhookLog = new this.webhookLogModel(createWebhookLogDto);
    return createdWebhookLog.save();
  }

  async findAll(queryParams: PageOptionsDto & Partial<WebhookLog>) {
    const { query, sort, page, pageSize } =
      this.paginationService.create<WebhookLog>(queryParams);

    const count = await this.webhookLogModel.countDocuments(query).exec();

    const data = await this.webhookLogModel
      .find(query)
      .sort(sort)
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const pageMetaDto = new PageMetaDto({
      total: count,
      pageOptionsDto: { page, pageSize },
    });

    return new PageDto(data, pageMetaDto);
  }

  findBySaleId(saleId: number) {
    return this.webhookLogModel.find({ saleId }).exec();
  }

  findByWebhookId(webhookId: number) {
    return this.webhookLogModel.find({ webhookId }).exec();
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

  async removeAll(): Promise<DeleteResult> {
    return await this.webhookLogModel.deleteMany({}).exec();
  }
}
