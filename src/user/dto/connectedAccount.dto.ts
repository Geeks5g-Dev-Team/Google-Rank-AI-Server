// connected-account.dto.ts
import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class TokenDto {
  @IsString()
  token: string;

  @IsString()
  expiry: string;

  @IsArray()
  @IsString({ each: true })
  scopes: string[];

  @IsString()
  client_id: string;

  @IsString()
  token_uri: string;

  @IsString()
  client_secret: string;

  @IsString()
  @IsOptional()
  refresh_token?: string;

  @IsString()
  universe_domain: string;
}

export class ConnectedAccountDto {
  @ValidateNested()
  @Type(() => TokenDto)
  token: TokenDto;

  @IsString()
  provider: string;

  @IsString()
  accountId: string;
}