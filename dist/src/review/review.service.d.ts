import { PrismaService } from 'prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewResponseDto } from './dto/response-review.dot';
import { BusinessService } from 'src/business/business.service';
import { UserService } from './../user/user.service';
import { ResponseGeneratorService } from './response-generator.service';
export declare class ReviewService {
    private readonly prisma;
    private readonly userService;
    private readonly businessService;
    private readonly responseGeneratorService;
    private readonly baseUrl;
    constructor(prisma: PrismaService, userService: UserService, businessService: BusinessService, responseGeneratorService: ResponseGeneratorService);
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
    getReviews(businessData: any, accessToken: string): Promise<any[]>;
    processReview(businessData: any, review: any, accessToken: string): Promise<any>;
    respondToReview(userId: string, locationId: string, reviewId: string, responseText: string, accessToken: string): Promise<{
        success: boolean;
    }>;
}
