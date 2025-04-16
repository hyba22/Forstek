import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Role } from '../users/dto/user.dto';

@Injectable()
export class RoleRedirectGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    
    // Get user from request (set by JwtStrategy)
    const user = request.user;
    
    if (!user) {
      return response.redirect('/login');
    }

    // define routes for each profile 
    const roleRoutes = {
      [Role.ADMIN]: '/admin/dashboard',
      [Role.PORTEUR]: '/project-holder/dashboard',
      [Role.STARTUP]: '/startupprofile',
      [Role.STAGIAIRE]: '/intern/dashboard',
      [Role.PARTENAIRE]: '/contact',
      [Role.UTILISATEUR]: '/user/dashboard',
      [Role.INVESTISSEUR]: '/investor/dashboard',
      [Role.VISITEUR]: '/visitor/dashboard',
      [Role.FREELANCE]: '/freelancer/dashboard',
    };

    // Redirect to appropriate dashboard
    response.redirect(roleRoutes[user.role] || '/default-dashboard');
    
    return true;
  }
}