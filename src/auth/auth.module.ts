import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
// import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { AccessTokenGuard } from './guards/accessToken.guards';

@Module({
  // imports: [
  //   JwtModule.register({
  //     secret: process.env.JWT_SECRET,
  //     signOptions: { expiresIn: process.env.JWT_LIFETIME },
  //   }),
  // ],
  providers: [AuthResolver, AuthService, PrismaService, JwtService, AccessTokenGuard],
  exports: [AuthService],
})

export class AuthModule {}