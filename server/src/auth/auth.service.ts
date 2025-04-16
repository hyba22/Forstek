import { 
  Injectable, 
  UnauthorizedException, 
  ConflictException 
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import User from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { Role } from '../users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    const validRoles = Object.values(Role);
    if (!validRoles.includes(signUpDto.role)) {
      throw new ConflictException('Invalid role specified');
    }
  
    console.log('Starting signUp process with DTO:', signUpDto);
    try {
      const {
        name,
        email,
        password,
        prenom,
        siteUrl,
        telephone,
        domaine,
        competences,
        nomSociete,
        adressePostale,
        dateCreation,
        role ,
      } = signUpDto;
  
      
      const existingUser = await this.usersRepository.findOne({ where: { email } });
      if (existingUser) {
        throw new ConflictException('Email already exists');
      }

      console.log('Hashing password for email:', email);
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log('Password hashed successfully');
  
      console.log('Creating user entity with provided data');
      const user = this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
        prenom,
        siteUrl,
        telephone,
        domaine,
        competences,
        nomSociete,
        adressePostale,
        dateCreation: dateCreation || new Date(), 
        role
      });
  
      console.log('Saving user to database...');
      await this.usersRepository.save(user);
      console.log('User saved successfully:', user);
      console.log('Creating user with role:', signUpDto.role);
      console.log('Generating JWT token for user ID:', user.id);
      const token = this.jwtService.sign({ 
        id: user.id,
        email: user.email,
        role: user.role
      });
      console.log('Token generated:', token);
  
      return { token };
    } catch (error) {
      console.error('Error in signUp:', error.message || error);
      if (error instanceof ConflictException) {
        throw error; 
      }
      throw new ConflictException('Registration failed');
    }
  }

  async login(loginDto: LoginDto): Promise<{ token: string }> {
    console.log('Starting login process with DTO:', loginDto);
    try {
      const { email, password } = loginDto;

      console.log('Searching for user with email:', email);
      const user = await this.usersRepository.findOne({
        where: { email },
      });

      if (!user) {
        console.log('User not found for email:', email);
        throw new UnauthorizedException('Invalid email or password');
      }

      console.log('User found:', user);
      console.log('Comparing password for user email:', email);
      const isPasswordMatched = await bcrypt.compare(password, user.password);

      if (!isPasswordMatched) {
        console.log('Password does not match for user email:', email);
        throw new UnauthorizedException('Invalid email or password');
      }

      console.log('Password matched, generating JWT token for user ID:', user.id);
      const token = this.jwtService.sign({ 
        id: user.id,
        email: user.email,
        role: user.role 
      });
      console.log('Token generated:', token);

      return { token };
    } catch (error) {
      console.error('Error in login:', error.message || error);
      throw new UnauthorizedException('Login failed');
    }
  }
}