import { Controller, Post, UploadedFiles, Body, UseInterceptors, BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { AnalyzeService } from './analyze.service';
import { memoryStorage } from 'multer';
import * as pdfParse from 'pdf-parse';

@Controller('analyze')
export class AnalyzeController {
  constructor(private readonly analyzeService: AnalyzeService) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('files', 2, {
      storage: memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB limit
        files: 2,
        fields: 1,
      },
    }),
  )
  async analyze(
    @UploadedFiles() files: Array<Express.Multer.File>,
    @Body('question') question: string,
  ) {
    console.log(
      'Files received:',
      files?.map(file => ({
        fieldname: file.fieldname,
        originalname: file.originalname,
        size: file.size,
        mimetype: file.mimetype,
      })),
    );
    console.log('Question received:', question);

    if (!files || files.length !== 2) {
      console.error('Expected exactly two files');
      throw new BadRequestException('Exactly two files (resume and jobOffer) are required');
    }

    if (!question) {
      console.error('No question received');
      throw new BadRequestException('Question field is required');
    }

    const resumeFile = files.find(file => file.fieldname === 'files' && file.originalname.includes('resume'));
    const jobOfferFile = files.find(file => file.fieldname === 'files' && file.originalname.includes('jobOffer'));

    if (!resumeFile) {
      console.error('Resume file not found');
      throw new BadRequestException('Resume file is missing');
    }

    if (!jobOfferFile) {
      console.error('JobOffer file not found');
      throw new BadRequestException('Job Offer file is missing');
    }

    let jobOfferData;
    try {
      if (!jobOfferFile.buffer) {
        console.error('JobOffer file buffer is undefined');
        throw new Error('JobOffer file buffer is missing');
      }
      const jobOfferContent = jobOfferFile.buffer.toString('utf-8');
      console.log('Raw jobOffer content:', jobOfferContent);
      jobOfferData = JSON.parse(jobOfferContent);
      console.log('Parsed jobOfferData:', jobOfferData);
    } catch (error) {
      console.error('Error parsing jobOffer:', error.message);
      throw new BadRequestException('Invalid jobOffer format: ' + error.message);
    }

    if (!jobOfferData.description) {
      console.error('JobOffer data missing description');
      throw new BadRequestException('Job offer must contain a description field');
    }

    let resumeText;
    try {
      if (!resumeFile.buffer) {
        console.error('Resume file buffer is undefined');
        throw new Error('Resume file buffer is missing');
      }
      const resumeData = await pdfParse(resumeFile.buffer);
      resumeText = resumeData.text;
      console.log('Extracted resume text (first 500 chars):', resumeText.substring(0, 500));
    } catch (error) {
      console.error('Error parsing resume PDF:', error.message);
      throw new BadRequestException('Invalid resume format: ' + error.message);
    }

    try {
      const response = await this.analyzeService.analyzeResumeAndJob(
        resumeText,
        jobOfferData.description,
        question,
      );
      return { response };
    } catch (error) {
      console.error('Error from AnalyzeService:', error.message);
      throw new BadRequestException(error.message);
    }
  }
}