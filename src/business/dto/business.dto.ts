import { PartialType } from '@nestjs/mapped-types';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsArray,
  ArrayMaxSize,
} from 'class-validator';

export class CreateBusinessDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  locationId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsArray()
  phones: string[];

  @IsString()
  location: string;

  @IsArray()
  services: string[];

  @IsArray()
  @IsString({ each: true })
  @ArrayMaxSize(10)
  keywords: string[];

  @IsArray()
  targetLocations: string[];

  @IsString()
  website: string;

  @IsOptional()
  coordinates: any;

  @IsOptional()
  @IsString()
  cid?: string;

  @IsString()
  @IsOptional()
  imagePrompt?: string;
}

export class UpdateBusinessDto extends PartialType(CreateBusinessDto) {}
