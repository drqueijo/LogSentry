import { PartialType } from '@nestjs/mapped-types';
import { CreateWebhookLogDto } from './create-webhooklog.dto';

export class UpdateWebhookLogDto extends PartialType(CreateWebhookLogDto) {}
