import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudflareService } from '../cloudflare/cloudflare.service';


@Injectable()
export class AnalyzeService {
  constructor(private readonly cloudflareService: CloudflareService) {}

  async analyzeResumeAndJob(resumeText: string, jobOfferText: string, question: string) {
    // Truncate texts to avoid exceeding Cloudflare Worker limits
    const maxLength = 5000;
    const truncatedResume = resumeText.length > maxLength ? resumeText.substring(0, maxLength) + '...' : resumeText;
    const truncatedJobOffer = jobOfferText.length > maxLength ? jobOfferText.substring(0, maxLength) + '...' : jobOfferText;

    const prompt = `Analyze the following resume and job offer. Resume: "${truncatedResume}". Job offer: "${truncatedJobOffer}". Answer the question: "${question}" in French, providing a detailed and professional response.`;

    try {
      const response = await this.cloudflareService.runAI(prompt);
      return response;
    } catch (error) {
      throw new BadRequestException(`Failed to analyze with Cloudflare: ${error.message}`);
    }
  }
}