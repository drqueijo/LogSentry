import { Injectable } from '@nestjs/common';
import { CreateWebhookLogDto } from './dto/create-webhooklog.dto';
import { UpdateWebhookLogDto } from './dto/update-webhooklog.dto';
import { InjectModel } from '@nestjs/mongoose';
import { WebhookLog, WebhookLogDocument } from './schemas/webhooklog.schema';
import { FilterQuery, Model } from 'mongoose';
import { PageOptionsDto } from '@/modules/pagination/dto/pageoptions.dto';
import { PaginationService } from '@/modules/pagination/pagination.service';
import { PageDto } from '@/modules/pagination/dto/page.dto';
import { PageMetaDto } from '@/modules/pagination/meta/page.meta';
import { DeleteResult } from 'typeorm/driver/mongodb/typings';
import { StatusCode } from './constants/webhook.constants';

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

  async findAll(
    queryParams: PageOptionsDto & Partial<WebhookLog & { status: string }>,
  ) {
    const { status, ...rest } = queryParams;
    const { query, sort, page, pageSize } =
      this.paginationService.create<WebhookLog>(rest, [
        'webhook.name',
        'sale.code',
        'event',
      ]);

    let responseStatusFilter: FilterQuery<WebhookLog>;

    switch (status) {
      case StatusCode.ERROR:
        responseStatusFilter = { $gte: 400 };
        break;
      case StatusCode.EMPTY:
        responseStatusFilter = { $in: [null, undefined] };
        break;
      case StatusCode.SUCCESS:
        responseStatusFilter = { $in: [200, 300] };
        break;
      default:
        break;
    }

    const finalQuery = {
      ...query,
      ...(responseStatusFilter && { responseStatus: responseStatusFilter }),
    };

    const count = await this.webhookLogModel.countDocuments(finalQuery).exec();

    const data = await this.webhookLogModel
      .find(finalQuery)
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
    return this.webhookLogModel.find({ sale: { id: saleId } }).exec();
  }

  async findByWebhookUuid(webhookUuid: string) {
    const webhookLogs = await this.webhookLogModel.find({ webhookUuid }).exec();
    return webhookLogs;
  }

  findOne(uuid: string) {
    const webhookLog = this.webhookLogModel.findOne({ _id: uuid }).exec();
    return webhookLog;
  }

  update(id: string, updateWebhookLogDto: UpdateWebhookLogDto) {
    return this.webhookLogModel
      .updateOne({ _id: id }, updateWebhookLogDto)
      .exec();
  }

  remove(id: number) {
    return `This action removes a #${id} webhooklog`;
  }

  async removeAll(): Promise<DeleteResult> {
    return await this.webhookLogModel.deleteMany({}).exec();
  }
}
