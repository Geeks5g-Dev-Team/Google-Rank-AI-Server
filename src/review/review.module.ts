import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ResponseGeneratorService } from './response-generator.service';
import { BusinessService } from 'src/business/business.service';
import { GeminiService } from './gemini-service';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [UserModule, MailModule],
  controllers: [ReviewController],
  providers: [
    ReviewService,
    PrismaService,
    BusinessService,
    GeminiService,
    ResponseGeneratorService,
  ],
})
export class ReviewModule { }
