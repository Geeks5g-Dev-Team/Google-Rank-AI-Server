// response-generator.service.ts
import { Injectable } from '@nestjs/common';
import { GeminiService } from './gemini-service';

@Injectable()
export class ResponseGeneratorService {

    constructor(private readonly geminiService: GeminiService) { }

    async generateReviewResponse(businessData: any, review: any): Promise<string> {
        try {
            if (!businessData || !review) {
                throw new Error('Business data and review are required');
            }

            const reviewerName = review.reviewer?.displayName || '';
            const starRating = review.starRating || 'FIVE';
            const reviewText = review.comment || '';

            if (!reviewText.trim()) {
                return `Thank you ${reviewerName} for your ${starRating.toLowerCase()} star review!`;
            }

            const prompt = `Generate a professional, grateful and enthusiastic response for ${businessData.name} to a positive review.
                          The response must be in exactly the same language as the review comment.
                          Keep it concise (1-2 short paragraphs).
                          Mention specific details from the review when possible.
                          Reviewer name: ${reviewerName}
                          Review: "${reviewText}"`;

            const result = await this.geminiService.generateContent({
                model: 'gemini-2.0-flash-001',
                contents: prompt,
                generationConfig: {
                    maxOutputTokens: 350,
                    temperature: 0.7,
                },
            });

            return result.text.trim();
        } catch (error) {
            throw new Error('Error generating review response: ' + error);
        }
    }
}