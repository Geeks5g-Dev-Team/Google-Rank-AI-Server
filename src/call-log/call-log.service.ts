import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateCallLogDto } from './dto/call-log.dto';

@Injectable()
export class CallLogService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCallLogDto) {
    return this.prisma.callLog.create({ data });
  }

  async findAll() {
    return this.prisma.callLog.findMany();
  }

  async findOne(id: number) {
    return this.prisma.callLog.findUnique({ where: { id } });
  }
}
