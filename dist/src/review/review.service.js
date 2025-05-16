"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const business_service_1 = require("../business/business.service");
const user_service_1 = require("./../user/user.service");
const response_generator_service_1 = require("./response-generator.service");
let ReviewService = class ReviewService {
    prisma;
    userService;
    businessService;
    responseGeneratorService;
    baseUrl = 'https://mybusiness.googleapis.com/v4';
    constructor(prisma, userService, businessService, responseGeneratorService) {
        this.prisma = prisma;
        this.userService = userService;
        this.businessService = businessService;
        this.responseGeneratorService = responseGeneratorService;
    }
    async create(data) {
        return this.prisma.review.create({ data });
    }
    async findAll() {
        return this.prisma.review.findMany();
    }
    async findOne(id) {
        const review = await this.prisma.review.findUnique({ where: { id } });
        if (!review)
            throw new common_1.NotFoundException('Review not found');
        return review;
    }
    async update(id, data) {
        try {
            return await this.prisma.review.update({
                where: { id },
                data,
            });
        }
        catch (err) {
            throw new common_1.BadRequestException('Unable to update review');
        }
    }
    async remove(id) {
        return this.prisma.review.delete({ where: { id } });
    }
    async respondToReviews(businessId) {
        const businessData = await this.businessService.findOne(businessId);
        if (!businessData) {
            return {
                business_id: businessId,
                total_reviews_processed: 0,
                successful_responses: 0,
                results: [],
            };
        }
        const userData = await this.userService.findOne(businessData.userId);
        if (!userData) {
            return {
                business_id: businessId,
                total_reviews_processed: 0,
                successful_responses: 0,
                results: [],
            };
        }
        const connectedAccounts = userData.connectedAccounts;
        if (!connectedAccounts || connectedAccounts.length === 0) {
            return {
                business_id: businessId,
                total_reviews_processed: 0,
                successful_responses: 0,
                results: [],
            };
        }
        const accessToken = connectedAccounts[0].token.token;
        const reviews = await this.getReviews(businessData, accessToken);
        if (!reviews || reviews.length === 0) {
            return {
                business_id: businessId,
                total_reviews_processed: 0,
                successful_responses: 0,
                results: [],
            };
        }
        const unrepliedReviews = reviews.filter((review) => !review.reviewReply &&
            ['THREE', 'FOUR', 'FIVE'].includes(review.starRating));
        const results = await Promise.all(unrepliedReviews.map((review) => this.processReview(businessData, review, accessToken)));
        const successfulResponses = results.filter((r) => r.success).length;
        return {
            business_id: businessId,
            total_reviews_processed: results.length,
            successful_responses: successfulResponses,
            results,
        };
    }
    async getReviews(businessData, accessToken) {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
            let allReviews = [];
            let nextPageToken = null;
            let hasMorePages = true;
            while (hasMorePages) {
                const endpoint = `/accounts/${businessData.userId}/locations/${businessData.locationId}/reviews`;
                const url = nextPageToken != null
                    ? `${this.baseUrl}${endpoint}?pageToken=${nextPageToken}`
                    : `${this.baseUrl}${endpoint}`;
                const response = await fetch(url, { headers });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                const reviews = data.reviews || [];
                allReviews = [...allReviews, ...reviews];
                if (data.nextPageToken) {
                    nextPageToken = data.nextPageToken;
                }
                else {
                    hasMorePages = false;
                }
            }
            return allReviews;
        }
        catch (error) {
            throw new common_1.BadRequestException('Error fetching reviews' + error);
        }
    }
    async processReview(businessData, review, accessToken) {
        try {
            const responseText = await this.responseGeneratorService.generateReviewResponse(businessData, review);
            if (!responseText) {
                return {
                    review_id: review.reviewId,
                    star_rating: review.starRating,
                    success: false,
                    message: 'Failed to generate response'
                };
            }
            const result = await this.respondToReview(businessData.userId, businessData.locationId, review.reviewId, responseText, accessToken);
            return {
                review_id: review.reviewId,
                star_rating: review.starRating,
                success: result.success,
                response: result.success ? responseText : null,
            };
        }
        catch (error) {
            return {
                review_id: review.reviewId,
                star_rating: review.starRating,
                success: false,
                message: 'Error processing review' + error,
            };
        }
    }
    async respondToReview(userId, locationId, reviewId, responseText, accessToken) {
        try {
            const headers = {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json',
            };
            const url = `${this.baseUrl}/accounts/${userId}/locations/${locationId}/reviews/${reviewId}/reply`;
            const response = await fetch(url, {
                method: 'PUT',
                headers,
                body: JSON.stringify({ comment: responseText }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return { success: true };
        }
        catch (error) {
            return { success: false };
        }
    }
};
exports.ReviewService = ReviewService;
exports.ReviewService = ReviewService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_service_1.UserService,
        business_service_1.BusinessService,
        response_generator_service_1.ResponseGeneratorService])
], ReviewService);
//# sourceMappingURL=review.service.js.map