"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mail_service_1 = require("../mail/mail.service");
const class_transformer_1 = require("class-transformer");
let UserService = class UserService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    generateJwt(user) {
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
    async create(data) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const newUser = await this.prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
                connectedAccounts: data.connectedAccounts
                    ? (0, class_transformer_1.instanceToPlain)(data.connectedAccounts)
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
    async findOne(userId) {
        return this.prisma.user.findUnique({ where: { userId } });
    }
    async update(userId, data) {
        if (data.password) {
            data.password = await bcrypt.hash(data.password, 10);
        }
        const updatedUser = await this.prisma.user.update({
            where: { userId },
            data: {
                ...data,
                connectedAccounts: data.connectedAccounts
                    ? (0, class_transformer_1.instanceToPlain)(data.connectedAccounts)
                    : undefined,
            },
        });
        const token = this.generateJwt(updatedUser);
        return { token };
    }
    async remove(userId) {
        return this.prisma.user.delete({ where: { userId } });
    }
    async login(email, password) {
        const user = await this.prisma.user.findUnique({
            where: { email },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const token = this.generateJwt(user);
        return { token };
    }
    async getTokens(userId) {
        const user = await this.prisma.user.findUnique({
            where: { userId },
            select: { connectedAccounts: true },
        });
        if (!user || !user.connectedAccounts) {
            throw new common_1.NotFoundException('OAuth token not found');
        }
        return JSON.stringify(user.connectedAccounts);
    }
    async findIdByEmail(email) {
        return this.prisma.user.findUnique({
            where: { email },
            select: { userId: true },
        });
    }
    async changePassword(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { userId } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (dto.currentPassword && user.password) {
            const isValid = await bcrypt.compare(dto.currentPassword, user.password);
            if (!isValid) {
                throw new common_1.UnauthorizedException('Current password is incorrect');
            }
        }
        const hashed = await bcrypt.hash(dto.newPassword, 10);
        await this.prisma.user.update({
            where: { userId },
            data: { password: hashed },
        });
        return { message: 'Password updated successfully' };
    }
    async getAllBusinesses(userId) {
        const user = (await this.prisma.user.findUnique({
            where: { userId },
            select: { connectedAccounts: true },
        }));
        if (!user || !user.connectedAccounts) {
            throw new common_1.NotFoundException('User or connected accounts not found');
        }
        const googleAccounts = user.connectedAccounts.filter((acc) => acc.provider === 'google');
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
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], UserService);
//# sourceMappingURL=user.service.js.map