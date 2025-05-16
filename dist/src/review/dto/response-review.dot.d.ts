declare class ReviewResponseResultDto {
    review_id: string;
    star_rating: string;
    success: boolean;
    response?: string;
    message?: string;
}
export declare class ReviewResponseDto {
    business_id: string;
    total_reviews_processed: number;
    successful_responses: number;
    results: ReviewResponseResultDto[];
}
export {};
