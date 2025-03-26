import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { BusinessModule } from './business/business.module';
import { CallLogModule } from './call-log/call-log.module';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [UserModule, BusinessModule, CallLogModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
