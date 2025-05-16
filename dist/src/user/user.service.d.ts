import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { MailService } from '../mail/mail.service';
export declare class UserService {
    private prisma;
    private mailService;
    constructor(prisma: PrismaService, mailService: MailService);
    generateJwt(user: any): any;
    create(data: CreateUserDto): Promise<{
        token: any;
    }>;
    findAll(): Promise<{
        userId: string;
        firstName: string;
        lastName: string;
        businessName: string;
        phone: string;
        email: string;
        password: string;
        connectedAccounts: import("@prisma/client/runtime/library").JsonValue;
        credits: number;
        createdAt: Date;
    }[]>;
    findOne(userId: string): Promise<{
        userId: string;
        firstName: string;
        lastName: string;
        businessName: string;
        phone: string;
        email: string;
        password: string;
        connectedAccounts: import("@prisma/client/runtime/library").JsonValue;
        credits: number;
        createdAt: Date;
    } | null>;
    update(userId: string, data: UpdateUserDto): Promise<{
        token: any;
    }>;
    remove(userId: string): Promise<{
        userId: string;
        firstName: string;
        lastName: string;
        businessName: string;
        phone: string;
        email: string;
        password: string;
        connectedAccounts: import("@prisma/client/runtime/library").JsonValue;
        credits: number;
        createdAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        token: any;
    }>;
    getTokens(userId: string): Promise<string>;
    findIdByEmail(email: string): Promise<{
        userId: string;
    } | null>;
    changePassword(userId: string, dto: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    getAllBusinesses(userId: string): Promise<{
        userId: string;
        createdAt: Date;
        name: string;
        locationId: string;
        phones: string[];
        location: string;
        services: string[];
        keywords: string[];
        targetLocations: string[];
        website: string | null;
        coordinates: import("@prisma/client/runtime/library").JsonValue;
        cid: string | null;
        imagePrompt: string | null;
        active: boolean;
        gmbData: import("@prisma/client/runtime/library").JsonValue;
    }[]>;
}
