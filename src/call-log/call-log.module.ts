import { Module } from '@nestjs/common';
import { CallLogService } from './call-log.service';
import { CallLogController } from './call-log.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  providers: [CallLogService, PrismaService],
  controllers: [CallLogController],
})
export class CallLogModule {}
