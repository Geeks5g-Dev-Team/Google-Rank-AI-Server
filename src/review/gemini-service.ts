// gemini.service.ts
import { Injectable } from '@nestjs/common';
import { GoogleGenAI } from '@google/genai';

@Injectable()
export class GeminiService {
    private readonly geminiClient: any;

    constructor() {
        this.geminiClient = new GoogleGenAI({
            apiKey: process.env.GEMINI_API_KEY || "AIzaSyBSxb9azeB7T68RlThBNYOgVEIqBT7AZ-M"
        });
    }

    async generateContent(params: {
        model?: string;
        contents: string;
        generationConfig: {
            maxOutputTokens: number;
            temperature: number;
        };
    }): Promise<{ text: string }> {
        try {
            const model = params.model || "gemini-2.0-flash-001";

            const result = await this.geminiClient.models.generateContent({
                model,
                contents: params.contents,
                generationConfig: params.generationConfig
            });

            return { text: result.text.trim() };
        } catch (error) {
            throw new Error('Failed to generate content' + error);
        }
    }
}