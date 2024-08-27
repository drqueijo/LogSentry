import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WebhookLogService } from './webhooklog.service';
import { CreateWebhookLogDto } from './dto/create-webhooklog.dto';
import { UpdateWebhookLogDto } from './dto/update-webhooklog.dto';

@Controller('webhooklog')
export class WebhookLogController {
  constructor(private readonly webhooklogService: WebhookLogService) {}

  @Post()
  create(@Body() createWebhookLogDto: CreateWebhookLogDto) {
    return this.webhooklogService.create(createWebhookLogDto);
  }

  @Get()
  findAll() {
    return this.webhooklogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.webhooklogService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWebhookLogDto: UpdateWebhookLogDto,
  ) {
    return this.webhooklogService.update(+id, updateWebhookLogDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.webhooklogService.remove(+id);
  }
}
