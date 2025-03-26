import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCallLogDto {
  @IsNotEmpty()
  @IsString()
  deviceId: string;

  @IsNotEmpty()
  @IsString()
  locationId: string;
}
