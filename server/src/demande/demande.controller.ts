import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DemandeService } from './demande.service';
import { CreateDemandeDto } from './dto/createdemande.dto';
import { UpdateDemandeDto } from './dto/updatedemande.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { StatutDemande } from './dto/statut-demande.enum';
import { Response, Request } from 'express';


@Controller('demandes')
export class DemandeController {
  constructor(private readonly demandeService: DemandeService) {}


    @Get('fetch-with-offers')
    async getDemandesWithOffers(@Req() request: Request) {
      console.log('=== Entering fetch-with-offers Endpoint ===');
      console.log('Request URL:', request.url);
      console.log('Request method:', request.method);
      console.log('Request query:', request.query);
      console.log('Request params:', request.params);
      console.log('Request headers:', request.headers);
     
  /*  try {
      console.log('Executing findAllWithOffers...');
      const demandes = await this.demandeService.findAllWithOffers();
      console.log('Successfully fetched demandes:', demandes);
      return demandes;
    } catch (error) {
      console.error('Error in getDemandesWithOffers:', error);
      throw new HttpException(
        {
          status: 'error',
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }*/
  }

  @Get('test-fetch')
async testFetch(@Req() request: Request) {
  console.log('Test fetch request:', request.url, request.query, request.params);
  return { message: 'Test successful', timestamp: new Date().toISOString() };
}

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.demandeService.findOne(id);
  }


  @Post('apply')
  async applyForOffer(@Body() createDemandeDto: CreateDemandeDto) {
    try {
      if (!createDemandeDto.offreId) {
        throw new BadRequestException('Offer ID is required');
      }
      return await this.demandeService.createForOffer(createDemandeDto);
    } catch (error) {
      console.error('Error creating demande:', error);
      throw new HttpException(
        error.message,
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  create(@Body() createDemandeDto: CreateDemandeDto) {
    return this.demandeService.create(createDemandeDto);
  }

  @Get()
  findAll() {
    return this.demandeService.findAll();
  }



  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDemandeDto: UpdateDemandeDto,
  ) {
    return this.demandeService.update(id, updateDemandeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.demandeService.remove(id);
  }

  @Patch(':id/statut')
  updateStatut(
    @Param('id', ParseIntPipe) id: number,
    @Body('statut') statut: StatutDemande,
  ) {
    return this.demandeService.updateStatut(id, statut);
  }
  @Post('upload-cv')
  @UseInterceptors(FileInterceptor('cv'))
  async uploadCV(@UploadedFile() file: Express.Multer.File) {
    // Removed offerId parameter
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }
    return this.demandeService.handleCVUpload(file);
  }

}
