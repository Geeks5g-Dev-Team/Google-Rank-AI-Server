import { ReviewService } from "./review.service";
import { CreateReviewDto } from "./dto/create-review.dto";
import { UpdateReviewDto } from "./dto/update-review.dto";
import { ReviewResponseDto } from "./dto/response-review.dot";
export declare class ReviewController {
    private readonly reviewService;
    constructor(reviewService: ReviewService);
    create(data: CreateReviewDto): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
    }>;
    findAll(): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
    }[]>;
    findOne(id: string): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
    }>;
    update(id: string, data: UpdateReviewDto): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
    }>;
    remove(id: string): Promise<{
        createdAt: Date;
        locationId: string;
        id: string;
        reviewContent: string;
        replyContent: string | null;
        reviewUrl: string | null;
        stars: number;
        author: string | null;
    }>;
    respondToReviews(businessId: string): Promise<ReviewResponseDto>;
}
