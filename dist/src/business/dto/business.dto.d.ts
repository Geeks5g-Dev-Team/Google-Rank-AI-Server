export declare class CreateBusinessDto {
    locationId: string;
    userId: string;
    name: string;
    phones: string[];
    location: string;
    services: string[];
    keywords: string[];
    targetLocations: string[];
    website: string;
    coordinates: any;
    cid?: string;
    imagePrompt?: string;
}
declare const UpdateBusinessDto_base: import("@nestjs/mapped-types").MappedType<Partial<CreateBusinessDto>>;
export declare class UpdateBusinessDto extends UpdateBusinessDto_base {
}
export {};
