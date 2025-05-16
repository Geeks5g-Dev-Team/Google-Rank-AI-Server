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
    getReviews(businessData: any, accessToken: string): Promise<any[]>;
    processReview(businessData: any, review: any, accessToken: string): Promise<any>;
    respondToReview(userId: string, locationId: string, reviewId: string, responseText: string, accessToken: string): Promise<{
        success: boolean;
    }>;
}
