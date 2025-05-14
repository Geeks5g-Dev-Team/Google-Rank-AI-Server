import { IsString, IsNotEmpty, IsObject, IsOptional } from 'class-validator';

export class ConnectedAccountDto {
  @IsString()
  @IsOptional()
  accountId?: string;

  @IsString()
  @IsNotEmpty()
  provider?: string;

  @IsObject()
  token?: object;
}
