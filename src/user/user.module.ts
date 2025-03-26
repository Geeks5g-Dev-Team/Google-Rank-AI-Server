import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { MailModule } from '../mail/mail.module';

@Module({
  providers: [UserService, PrismaService],
  controllers: [UserController],
  imports: [MailModule],
})
export class UserModule {}
