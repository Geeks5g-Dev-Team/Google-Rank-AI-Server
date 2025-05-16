import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewResponseDto } from "./dto/response-review.dot";
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(data: CreateReviewDto): Promise<{
        id: string;
        locationId: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        locationId: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        locationId: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
        createdAt: Date;
    }>;
    update(id: string, data: UpdateReviewDto): Promise<{
        id: string;
        locationId: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        locationId: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
        createdAt: Date;
    }>;
    respondToReviews(businessId: string): Promise<ReviewResponseDto>;
}
