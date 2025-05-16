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
exports.ResponseGeneratorService = void 0;
const common_1 = require("@nestjs/common");
const gemini_service_1 = require("./gemini-service");
let ResponseGeneratorService = class ResponseGeneratorService {
    geminiService;
    constructor(geminiService) {
        this.geminiService = geminiService;
    }
    async generateReviewResponse(businessData, review) {
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
            const formattedServices = (businessData.services || []).map((service) => {
                return service.replace('job_type_id:', '')
                    .replace(/_/g, ' ')
                    .trim();
            });
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
        }
        catch (error) {
            throw new Error('Error generating review response: ' + error);
        }
    }
};
exports.ResponseGeneratorService = ResponseGeneratorService;
exports.ResponseGeneratorService = ResponseGeneratorService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [gemini_service_1.GeminiService])
], ResponseGeneratorService);
//# sourceMappingURL=response-generator.service.js.map