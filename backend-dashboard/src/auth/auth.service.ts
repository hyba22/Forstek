import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userRepository.findOne({ where: { email } });
    
    if (user && user.password === password) { // Attention: comparaison en clair - seulement pour développement
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    // Retourne simplement l'utilisateur sans JWT
    return { user };
  }

  async signUp(signUpDto: any) {
    const user = this.userRepository.create(signUpDto);
    await this.userRepository.save(user);
    return { message: 'User registered successfully', user };
  }
}