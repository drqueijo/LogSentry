import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { WebhookLogService } from './webhooklog.service';
import { CreateWebhookLogDto } from './dto/create-webhooklog.dto';
import { UpdateWebhookLogDto } from './dto/update-webhooklog.dto';
import { PageOptionsDto } from '@/modules/pagination/dto/pageoptions.dto';
import { WebhookLog } from './schemas/webhooklog.schema';

@Controller('webhooklog')
export class WebhookLogController {
  constructor(private readonly webhooklogService: WebhookLogService) {}

  @Post()
  create(@Body() createWebhookLogDto: CreateWebhookLogDto) {
    return this.webhooklogService.create(createWebhookLogDto);
  }

  @Get()
  findAll(
    @Query() query: PageOptionsDto & Partial<WebhookLog & { status: string }>,
  ) {
    return this.webhooklogService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webhooklogService.findOne(id);
  }

  @Get('sale/:saleId')
  findBySaleId(@Param('saleId') saleId: string) {
    return this.webhooklogService.findBySaleId(+saleId);
  }

  @Get('webhook-uuid/:webhookUuid')
  findByWebhookId(@Param('webhookUuid') webhookUuid: string) {
    return this.webhooklogService.findByWebhookUuid(webhookUuid);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWebhookLogDto: UpdateWebhookLogDto,
  ) {
    return this.webhooklogService.update(id, updateWebhookLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhooklogService.remove(+id);
  }

  @Delete()
  removeAll() {
    return this.webhooklogService.removeAll();
  }
}
