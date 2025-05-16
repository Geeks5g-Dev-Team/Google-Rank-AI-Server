import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateBusinessDto, UpdateBusinessDto } from './dto/business.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class BusinessService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) { }

  async create(data: CreateBusinessDto) {
    const newBusiness = await this.prisma.business.create({ data });

    const user = await this.prisma.user.findUnique({
      where: { userId: newBusiness.userId },
      select: { email: true },
    });
    if (user?.email) {
      await this.mailService.sendBusinessNotification(
        user.email,
        newBusiness.name,
      );
      await this.mailService.sendBusinessNotificationToUser(
        user.email,
        newBusiness.name,
      );
    }
    return newBusiness;
  }

  async findAll() {
    return this.prisma.business.findMany();
  }

  async findAllByUserId(userId: string) {
    return this.prisma.business.findMany({
      where: { userId },
    });
  }

  async findOne(locationId: string) {
    return this.prisma.business.findUnique({ where: { locationId } });
  }

  async update(locationId: string, data: UpdateBusinessDto) {
    return this.prisma.business.update({ where: { locationId }, data });
  }

  async remove(locationId: string) {
    return this.prisma.business.delete({ where: { locationId } });
  }

  async getServices(locationId: string) {
    const business = await this.prisma.business.findUnique({
      where: { locationId },
      select: { services: true },
    });

    if (!business) {
      throw new Error('Business not found');
    }

    return business.services;
  }

  async getKeywords(locationId: string) {
    const business = await this.prisma.business.findUnique({
      where: { locationId },
      select: { keywords: true },
    });

    if (!business) {
      throw new Error('Business not found');
    }

    return business.keywords;
  }
}