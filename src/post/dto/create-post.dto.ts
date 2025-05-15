import { IsOptional, IsString, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  locationId: string;

  @IsString()
  @IsOptional()
  postContent?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  postImage?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  postUrl?: string;
}
