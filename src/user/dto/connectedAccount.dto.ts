import { IsString, IsNotEmpty } from 'class-validator';

export class ConnectedAccountDto {
  @IsString()
  @IsNotEmpty()
  accountId: string;
  @IsString()
  @IsNotEmpty()
  provider: string;
  token: any;
}
