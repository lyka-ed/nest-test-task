import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpInput } from './dto/signup-input';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let prisma: PrismaService;

  //   beforeEach(async () => {
  //     const module: TestingModule = await Test.createTestingModule({
  //       providers: [
  //         AuthService,
  //         {
  //           provide: PrismaService,
  //           useValue: {
  //             user: {
  //               create: jest.fn(),
  //               findUnique: jest.fn(),
  //             },
  //           },
  //         },
  //         {
  //           provide: JwtService,
  //           useValue: {
  //             sign: jest.fn(() => 'mock-token'),
  //           },
  //         },
  //       ],
  //     }).compile();

  //     service = module.get<AuthService>(AuthService);
  //     prisma = module.get<PrismaService>(PrismaService);
  //   });

  //   it('should register a user', async () => {
  //     const emailSignUpInput: EmailSignupInputDto = {
  //       email: 'test@example.com',

  //     const result = await service.register(emailSignUpInput);
  //     expect(result).toEqual({ accessToken: 'mock_token' });
  //   });

  //     const result = await service.login('test@example.com', 'hashPassword');
  //     expect(result).toEqual({ access_token: 'mock-token' });
  //   });

  //   it('should throw error on invalid login', async () => {
  //     jest.spyOn(prisma.user, 'findUnique').mockResolvedValue(null);
  //     await expect(service.login('test@example.com', 'password')).rejects.toThrow(
  //       UnauthorizedException,
  //     );
  //   });
});
