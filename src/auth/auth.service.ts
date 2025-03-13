import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { EmailSignupInputDto } from './dto/email-signup-input';
import {
  hashPassword,
  verifyHash,
  generateToken,
} from 'src/utils/bcrypt.helper';
import { PrismaService } from 'prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(
    signUpInput: EmailSignupInputDto,
  ): Promise<{ access_token: string }> {
    const { email, password } = signUpInput;

    //check for existing user
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await hashPassword(password);

    const user = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return this.generateToken(user, this.jwtService);
  }

  // Login
  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    // check if email exists
    if (!user) {
      throw new UnauthorizedException(`This email is not registered`);
    }

    // check if password is correct
    const isPasswordValid = await verifyHash(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Incorrect password');
    }

    return this.generateToken(user);
  }
}
