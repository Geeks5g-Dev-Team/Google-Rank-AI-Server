import { ConnectedAccountDto } from './connectedAccount.dto';
export declare class CreateUserDto {
    userId: string;
    firstName: string;
    lastName: string;
    businessName: string;
    phone: string;
    email: string;
    password: string;
    connectedAccounts?: ConnectedAccountDto[];
    isMain: boolean;
}
declare const UpdateUserDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
}
export {};
