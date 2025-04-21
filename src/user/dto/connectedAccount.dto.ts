import { IsString, IsNotEmpty } from 'class-validator';

export class ConnectedAccountDto {
  @IsString()
  @IsNotEmpty()
  accountId: string;
  token: any;
}
