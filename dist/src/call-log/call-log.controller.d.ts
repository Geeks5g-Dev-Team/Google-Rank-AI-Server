import { CallLogService } from './call-log.service';
import { CreateCallLogDto } from './dto/call-log.dto';
export declare class CallLogController {
    private readonly callLogService;
    constructor(callLogService: CallLogService);
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
    findOne(id: string): Promise<{
        locationId: string;
        id: number;
        deviceId: string;
        date: Date;
    } | null>;
}
