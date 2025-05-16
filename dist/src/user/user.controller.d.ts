import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    getUserIdByEmail(email: string): Promise<{
        userId: string;
    } | {
        userId: null;
    }>;
    findOne(id: string): Promise<{
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
    update(id: string, data: UpdateUserDto): Promise<{
        token: any;
    }>;
    remove(id: string): Promise<{
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
    login(data: {
        email: string;
        password: string;
    }): Promise<{
        token: any;
    }>;
    getOauthTokens(userId: string): Promise<string>;
    changePassword(userId: string, dto: {
        currentPassword: string;
        newPassword: string;
    }): Promise<{
        message: string;
    }>;
    getUserBusinesses(userId: string): Promise<{
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
