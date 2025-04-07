import { Controller, Get, Put, Patch, Delete, Req, Body, UseGuards, UnauthorizedException } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { StagiaireService } from './stagiaire.service';
import { Request } from 'express';

@Controller('stagiaire')
@UseGuards(JwtAuthGuard)
export class StagiaireController {
  constructor(private readonly stagiaireService: StagiaireService) {}

  @Get('suivi-demande')
  async getSuiviDemande(@Req() request: Request) {
    if (!request.user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    const userId = request.user.id; 
    const demandes = await this.stagiaireService.getDemandesByUser(userId);
    return { message: "Liste des demandes", data: demandes };
  }

  @Put('parametres')
  async updateParametres(@Req() request: Request, @Body() data: { nom: string; email: string }) {
    if (!request.user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    const userId = request.user.id; 
    return this.stagiaireService.updateParametres(userId, data);
  }

  @Patch('mot-de-passe')
  async updatePassword(@Req() request: Request, @Body() data: { motDePasse: string }) {
    if (!request.user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    const userId = request.user.id; 
    return this.stagiaireService.updatePassword(userId, data.motDePasse);
  }

  @Delete('compte')
  async deleteCompte(@Req() request: Request) {
    if (!request.user) {
      throw new UnauthorizedException('Utilisateur non authentifié');
    }
    const userId = request.user.id; 
    return this.stagiaireService.deleteCompte(userId);
  }
}