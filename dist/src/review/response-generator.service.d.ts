import { GeminiService } from './gemini-service';
export declare class ResponseGeneratorService {
    private readonly geminiService;
    constructor(geminiService: GeminiService);
    generateReviewResponse(businessData: any, review: any): Promise<string>;
}
