import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.prisma.user.create({
      data: { ...data, password: hashedPassword },
    });

    await this.mailService.sendUserNotification(newUser.email);
    await this.mailService.sendUserNotificationToUser(newUser.email);
    return newUser;
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(userId: string) {
    return this.prisma.user.findUnique({ where: { userId } });
  }

  async update(userId: string, data: UpdateUserDto) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    return this.prisma.user.update({ where: { userId }, data });
  }

  async remove(userId: string) {
    return this.prisma.user.delete({ where: { userId } });
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async getToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      select: { token: true },
    });

    if (!user || !user.token) {
      throw new NotFoundException('OAuth token not found');
    }

    return JSON.stringify(user.token);
  }
}
