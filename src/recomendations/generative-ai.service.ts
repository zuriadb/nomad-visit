import { Injectable } from "@nestjs/common";
import { LlmContextDto } from "./dto/recomendations.dto";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { recomendationsPromt } from "./promt/recomendations.promt";
import { HttpException, HttpStatus } from "@nestjs/common";
import { RecomendationsService } from "./recomendations.service";

@Injectable()
export class GenerativeAiService {
private genAI: GoogleGenerativeAI;

  constructor(
    private readonly recomendationsService: RecomendationsService,
  ) {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
  }

  async generateAndSave(dto: LlmContextDto) {
    const prompt = recomendationsPromt(
      dto.cityName,
      dto.userPreferences,
      dto.currentWeather,
      dto.timeOfDay,
      dto.season,
    );

    try {
      const model = this.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      const result = await model.generateContent(prompt);
      const text = result.response.text();

      const parsed = JSON.parse(text);

      if (!parsed.recommendations) {
        throw new Error("Invalid response from Gemini");
      }

      const entities = await this.recomendationsService.createMany(parsed.recommendations);

      return {
        recommendations: entities,
        summary: parsed.summary,
      };
    } catch (err) {
      throw new HttpException(
        `Ошибка при генерации и сохранении рекомендаций: ${err.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}