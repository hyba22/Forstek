import { BadRequestException, Injectable } from '@nestjs/common';
import { CloudflareService } from '../cloudflare/cloudflare.service';
import * as pdfParse from 'pdf-parse';
import path from 'path';
import * as fs from 'fs';
/*
@Injectable()
   export class AnalyzeService {
    constructor(private readonly cloudflareService: CloudflareService) {}

  async analyzeResumeAndJob(cvFilename: string, jobOfferText: string, question: string) {
      // Use process.cwd() to ensure the path is resolved from the project root
      const cvPath = path.join(process.cwd(), 'uploads', cvFilename);
      let resumeText = '';
      try {
        resumeText = fs.readFileSync(cvPath, 'utf-8');
      } catch (error) {
        throw new Error(`Failed to read CV file: ${error.message}`);
      }
  
      const prompt = `Analyze the following resume: "${resumeText}" and job offer: "${jobOfferText}". Answer the question: "${question}" in French, providing a detailed and professional response.`;
      const response = await this.cloudflareService.runAI(prompt);
      return { [question]: response };
    }
}
*/

@Injectable()
export class AnalyzeService {
  constructor(private readonly cloudflareService: CloudflareService) {}

  async analyzeResumeAndJob(resumeText: string, jobOfferText: string, question: string) {
    // Truncate texts to avoid exceeding Cloudflare Worker limits
    const maxLength = 4000;
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