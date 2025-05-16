import { Module } from '@nestjs/common';
import { BusinessService } from './business.service';
import { BusinessController } from './business.controller';
import { PrismaService } from 'prisma/prisma.service';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [BusinessService, PrismaService],
  controllers: [BusinessController],
  imports: [MailModule],
  exports: [BusinessService],
})
export class BusinessModule { }
