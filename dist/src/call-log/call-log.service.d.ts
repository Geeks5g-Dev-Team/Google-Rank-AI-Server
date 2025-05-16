import { PrismaService } from 'prisma/prisma.service';
import { CreateCallLogDto } from './dto/call-log.dto';
export declare class CallLogService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: CreateCallLogDto): Promise<{
        locationId: string;
        id: number;
        deviceId: string;
        date: Date;
    }>;
    findAll(): Promise<{
        locationId: string;
        id: number;
        deviceId: string;
        date: Date;
    }[]>;
    findOne(id: number): Promise<{
        locationId: string;
        id: number;
        deviceId: string;
        date: Date;
    } | null>;
}
