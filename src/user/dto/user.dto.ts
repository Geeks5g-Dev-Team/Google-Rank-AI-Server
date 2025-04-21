import { PartialType } from '@nestjs/mapped-types';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ConnectedAccountDto } from './connectedAccount.dto';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  userId: string;

  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsString()
  businessName: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsArray()
  @ValidateNested({ each: true })
  connectedAccounts?: ConnectedAccountDto[];

  @IsBoolean()
  isMain: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
