import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ReviewResponseDto } from './dto/response-review.dot';
import { BusinessService } from 'src/business/business.service';
import { UserService } from './../user/user.service';
import { ConnectedAccountDto } from './../user/dto/connectedAccount.dto';
import { ResponseGeneratorService } from './response-generator.service';

@Injectable()
export class ReviewService {
  private readonly baseUrl = 'https://mybusiness.googleapis.com/v4';

  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
    private readonly businessService: BusinessService,
    private readonly responseGeneratorService: ResponseGeneratorService,
  ) { }

  async create(data: CreateReviewDto) {
    return this.prisma.review.create({ data });
  }

  async findAll() {
    return this.prisma.review.findMany();
  }

  async findOne(id: string) {
    const review = await this.prisma.review.findUnique({ where: { id } });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: string, data: UpdateReviewDto) {
    try {
      return await this.prisma.review.update({
        where: { id },
        data,
      });
    } catch (err) {
      throw new BadRequestException('Unable to update review');
    }
  }

  async remove(id: string) {
    return this.prisma.review.delete({ where: { id } });
  }

  async respondToReviews(businessId: string): Promise<ReviewResponseDto> {
    const businessData = await this.businessService.findOne(businessId);

    if (!businessData) {
      return {
        business_id: businessId,
        total_reviews_processed: 0,
        successful_responses: 0,
        results: [],
      }
    }

    const userData = await this.userService.findOne(businessData.userId);

    if (!userData) {
      return {
        business_id: businessId,
        total_reviews_processed: 0,
        successful_responses: 0,
        results: [],
      }
    }

    const connectedAccounts = userData.connectedAccounts as unknown as ConnectedAccountDto[];

    if (!connectedAccounts || connectedAccounts.length === 0) {
      return {
        business_id: businessId,
        total_reviews_processed: 0,
        successful_responses: 0,
        results: [],
      }
    }

    const accessToken = connectedAccounts[0].token.token; //TODO: Samuel change this var to accessToken
    const reviews = await this.getReviews(businessData, accessToken);

    if (!reviews || reviews.length === 0) {
      return {
        business_id: businessId,
        total_reviews_processed: 0,
        successful_responses: 0,
        results: [],
      };
    }

    const unrepliedReviews = reviews.filter((review) =>
      !review.reviewReply &&
      ['THREE', 'FOUR', 'FIVE'].includes(review.starRating)
    );
    const results = await Promise.all(
      unrepliedReviews.map((review) =>
        this.processReview(businessData, review, accessToken),
      ),
    );

    const successfulResponses = results.filter((r) => r.success).length;

    return {
      business_id: businessId,
      total_reviews_processed: results.length,
      successful_responses: successfulResponses,
      results,
    };
  }

  async getReviews(businessData: any, accessToken: string): Promise<any[]> {
    try {
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      let allReviews: any[] = [];
      let nextPageToken = null;
      let hasMorePages = true;

      while (hasMorePages) {
        const endpoint = `/accounts/${businessData.userId}/locations/${businessData.locationId}/reviews`;
        const url =
          nextPageToken != null
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
        } else {
          hasMorePages = false;
        }
      }
      return allReviews;
    } catch (error) {
      throw new BadRequestException('Error fetching reviews' + error);
    }
  }

  async processReview(businessData: any, review: any, accessToken: string): Promise<any> {
    try {
      const responseText = await this.responseGeneratorService.generateReviewResponse(
        businessData,
        review,
      );

      if (!responseText) {
        return {
          review_id: review.reviewId,
          star_rating: review.starRating,
          success: false,
          message: 'Failed to generate response'
        };
      }

      const result = await this.respondToReview(
        businessData.userId,
        businessData.locationId,
        review.reviewId,
        responseText,
        accessToken,
      );

      return {
        review_id: review.reviewId,
        star_rating: review.starRating,
        success: result.success,
        response: result.success ? responseText : null,
      };
    } catch (error) {
      return {
        review_id: review.reviewId,
        star_rating: review.starRating,
        success: false,
        message: 'Error processing review' + error,
      };
    }
  }

  async respondToReview(
    userId: string,
    locationId: string,
    reviewId: string,
    responseText: string,
    accessToken: string,
  ): Promise<{ success: boolean }> {
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
    } catch (error) {
      return { success: false };
    }
  }
}
