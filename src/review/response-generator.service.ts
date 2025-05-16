



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

            const locationAddress = businessData.location || '';
            const cityMatch = locationAddress.match(/,\s*([^,]+),\s*([A-Z]{2}),\s*US$/);
            const cityName = cityMatch ? cityMatch[1] : '';
            const streetNameMatch = locationAddress.match(/^([^,]+),/);
            const streetName = streetNameMatch ? streetNameMatch[1] : '';

            const formattedServices = (businessData.services || []).map((service: string) => {
                return service.replace('job_type_id:', '')
                    .replace(/_/g, ' ')
                    .trim();
            });

            // Tomar los 3 primeros servicios para el contexto
            const relevantServices = formattedServices.length > 0
                ? formattedServices.slice(0, 3).join(', ')
                : '';

            if (!reviewText.trim()) {
                return `Thank you ${reviewerName} for your ${starRating.toLowerCase()} star review!`;
            }

            let prompt = `**Do NOT include the original review text in the response.**
Generate a professional, grateful, and enthusiastic response for ${businessData.name} to a positive review.
The response must be in exactly the same language as the review comment.
Keep it concise (1-2 short paragraphs).
Mention specific details from the review when possible
Reviewer name: ${reviewerName}
Review comment to respond to: "${reviewText}"`;

            if (cityName) {
                prompt += `\nBusiness location: ${streetName}, ${cityName}.`;
            } else if (cityName) {
                prompt += `\nBusiness city: ${cityName}.`;
            }

            if (relevantServices) {
                prompt += `\nBusiness services for context: ${relevantServices}.`;
            }

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