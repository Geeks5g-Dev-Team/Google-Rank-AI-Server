export declare class GeminiService {
    private readonly geminiClient;
    constructor();
    generateContent(params: {
        model?: string;
        contents: string;
        generationConfig: {
            maxOutputTokens: number;
            temperature: number;
        };
    }): Promise<{
        text: string;
    }>;
}
