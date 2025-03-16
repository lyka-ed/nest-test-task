import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignUpInput } from './dto/signup-input';
import { SignInInput } from './dto/sigin-input.';
import { BiometricLoginInputDto } from './dto/biometric-input';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  // Sign up
  async signup(signUpInput: SignUpInput) {
    // Check for existing user
    const existingUser = await this.prisma.user.findUnique({
      where: { email: signUpInput.email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists.');
    }

    // hash password
    const hashedPassword = await argon.hash(signUpInput.hashedPassword);
    const user = await this.prisma.user.create({
      data: {
        email: signUpInput.email,
        hashedPassword: hashedPassword,
      },
    });

    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );
    await this.updateRefreshToken(user.id, refreshToken);
    return { accessToken, refreshToken, user };
  }

  // // Login
  async signin(signInInput: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: signInInput.email },
    });
    if (!user) {
      throw new UnauthorizedException('Incorrect Email');
    }

    const verifyPassword = await argon.verify(
      user.hashedPassword,
      signInInput.password,
    );

    if (!verifyPassword) {
      throw new UnauthorizedException('Incorrect Password');
    }
    const { accessToken, refreshToken } = await this.createTokens(
      user.id,
      user.email,
    );

    await this.updateRefreshToken(user.id, refreshToken);

    return { accessToken, refreshToken, user };
  }


  // Biometric Login
  async biometricLogin(
    biometricLogin: BiometricLoginInputDto,
  ): Promise<{ accessToken: string }> {
    const user = await this.prisma.user.findUnique({
      where: { biometricKey: biometricLogin.biometricKey },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid biometric key');
    }

    return this.generateToken(user.id.toString());
  }

  async createTokens(userId: number, email: string) {
    const accessToken = this.jwtService.sign(
      {
        userId,
        email,
      },
      {
        expiresIn: '1hr',
        secret: this.configService.get('ACCESS_TOKEN_SECRET'),
      },
    );
    const refreshToken = this.jwtService.sign(
      {
        userId,
        email,
        accessToken,
      },
      {
        expiresIn: '7d',
        secret: this.configService.get('REFRESH_TOKEN_SECRET'),
      },
    );
    return { accessToken, refreshToken };
  }

  async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await argon.hash(refreshToken);
    await this.prisma.user.update({
      where: { id: userId },
      data: { hashedRefreshToken },
    });
  }
}
