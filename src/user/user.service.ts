import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { ConnectedAccountDto } from './dto/connectedAccount.dto';
import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import { MailService } from '../mail/mail.service';
import { instanceToPlain } from 'class-transformer';
import { connect } from 'http2';

interface ConnectedAccount {
  accountId: string;
  provider: string;
  token: any;
}

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
  ) {}

  generateJwt(user: any) {
    const payload = {
      userId: user.userId,
      firstName: user.firstName,
      lastName: user.lastName,
      businessName: user.businessName,
      phone: user.phone,
      email: user.email,
      credits: user.credits,
      createdAt: user.createdAt,
    };
    return jwt.sign({ payload }, process.env.JWT_SECRET, { expiresIn: '1h' });
  }

  async create(data: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    const newUser = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
        connectedAccounts: data.connectedAccounts
          ? instanceToPlain(data.connectedAccounts)
          : undefined,
      },
    });

    await this.mailService.sendUserNotification(newUser.email);
    await this.mailService.sendUserNotificationToUser(newUser.email);

    const token = this.generateJwt(newUser);
    return { token };
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

    const updatedUser = await this.prisma.user.update({
      where: { userId },
      data: {
        ...data,
        connectedAccounts: data.connectedAccounts
          ? instanceToPlain(data.connectedAccounts) // ✅ convert to plain JSON-safe array
          : undefined,
      },
    });

    const token = this.generateJwt(updatedUser);
    return { token };
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

    const token = this.generateJwt(user);
    return { token };
  }

  async getTokens(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { userId },
      select: { connectedAccounts: true },
    });

    if (!user || !user.connectedAccounts) {
      throw new NotFoundException('OAuth token not found');
    }

    return JSON.stringify(user.connectedAccounts);
  }

  async findIdByEmail(email: string): Promise<{ userId: string } | null> {
    return this.prisma.user.findUnique({
      where: { email },
      select: { userId: true },
    });
  }

  async changePassword(
    userId: string,
    dto: { currentPassword: string; newPassword: string },
  ) {
    const user = await this.prisma.user.findUnique({ where: { userId } });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    // If current password is set and user has one, validate it
    if (dto.currentPassword && user.password) {
      const isValid = await bcrypt.compare(dto.currentPassword, user.password);
      if (!isValid) {
        throw new UnauthorizedException('Current password is incorrect');
      }
    }

    const hashed = await bcrypt.hash(dto.newPassword, 10);
    await this.prisma.user.update({
      where: { userId },
      data: { password: hashed },
    });

    return { message: 'Password updated successfully' };
  }

  async getAllBusinesses(userId: string) {
    const user = (await this.prisma.user.findUnique({
      where: { userId },
      select: { connectedAccounts: true },
    })) as { connectedAccounts: ConnectedAccount[] | null };

    if (!user || !user.connectedAccounts) {
      throw new NotFoundException('User or connected accounts not found');
    }

    const googleAccounts = user.connectedAccounts.filter(
      (acc) => acc.provider === 'google',
    );

    const accountIds = googleAccounts.map((acc) => acc.accountId);

    if (accountIds.length === 0) {
      return [];
    }

    const businesses = await this.prisma.business.findMany({
      where: {
        userId: {
          in: accountIds,
        },
      },
    });

    return businesses;
  }
}
