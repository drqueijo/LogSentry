import { Controller, Get } from '@nestjs/common';
import { AdminlogService } from './adminlog.service';

@Controller('adminlog')
export class AdminlogController {
  constructor(private readonly adminlogService: AdminlogService) {}

  @Get()
  findAll() {
    return this.adminlogService.findAll();
  }
}
