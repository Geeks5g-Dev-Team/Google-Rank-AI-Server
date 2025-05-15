import { IsOptional, IsString, IsUrl, IsInt, Min, Max } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  locationId: string;

  @IsString()
  @IsOptional()
  reviewContent?: string;

  @IsString()
  @IsOptional()
  replyContent?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  reviewUrl?: string;

  @IsInt()
  @Min(0)
  @Max(5)
  stars: number;

  @IsString()
  @IsOptional()
  author?: string;
}
