import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CallLogService } from './call-log.service';
import { CreateCallLogDto } from './dto/call-log.dto';

@Controller('call-logs')
export class CallLogController {
  constructor(private readonly callLogService: CallLogService) {}

  @Post()
  create(@Body() data: CreateCallLogDto) {
    return this.callLogService.create(data);
  }

  @Get()
  findAll() {
    return this.callLogService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.callLogService.findOne(Number(id));
  }
}
