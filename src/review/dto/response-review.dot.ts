// review-response.dto.ts
import { IsString, IsOptional, IsArray, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

class ReviewResponseResultDto {
    @IsString()
    review_id: string;

    @IsString()
    star_rating: string;

    @IsString()
    success: boolean;

    @IsString()
    @IsOptional()
    response?: string;

    @IsString()
    @IsOptional()
    message?: string;
}

export class ReviewResponseDto {
    @IsString()
    business_id: string;

    @IsString()
    total_reviews_processed: number;

    @IsString()
    successful_responses: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReviewResponseResultDto)
    results: ReviewResponseResultDto[];
}
