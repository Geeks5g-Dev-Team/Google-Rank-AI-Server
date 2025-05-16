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
exports.BusinessService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const mail_service_1 = require("../mail/mail.service");
let BusinessService = class BusinessService {
    prisma;
    mailService;
    constructor(prisma, mailService) {
        this.prisma = prisma;
        this.mailService = mailService;
    }
    async create(data) {
        const newBusiness = await this.prisma.business.create({ data });
        const user = await this.prisma.user.findUnique({
            where: { userId: newBusiness.userId },
            select: { email: true },
        });
        if (user?.email) {
            await this.mailService.sendBusinessNotification(user.email, newBusiness.name);
            await this.mailService.sendBusinessNotificationToUser(user.email, newBusiness.name);
        }
        return newBusiness;
    }
    async findAll() {
        return this.prisma.business.findMany();
    }
    async findOne(locationId) {
        return this.prisma.business.findUnique({ where: { locationId } });
    }
    async update(locationId, data) {
        return this.prisma.business.update({ where: { locationId }, data });
    }
    async remove(locationId) {
        return this.prisma.business.delete({ where: { locationId } });
    }
    async getServices(locationId) {
        const business = await this.prisma.business.findUnique({
            where: { locationId },
            select: { services: true },
        });
        if (!business) {
            throw new Error('Business not found');
        }
        return business.services;
    }
    async getKeywords(locationId) {
        const business = await this.prisma.business.findUnique({
            where: { locationId },
            select: { keywords: true },
        });
        if (!business) {
            throw new Error('Business not found');
        }
        return business.keywords;
    }
};
exports.BusinessService = BusinessService;
exports.BusinessService = BusinessService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        mail_service_1.MailService])
], BusinessService);
//# sourceMappingURL=business.service.js.map