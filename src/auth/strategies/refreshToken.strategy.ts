import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { JwtPayload, JwtPayloadWithRefreshToken } from '../types';
import { Request } from 'express';

@Injectable()
export class RefreshTokenStrategies extends PassportStrategy(
  Strategy,
  'jwt-refresh',
) {
  constructor(public config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearer(),
      secretOrkey: config.get('REFRESH_TOKEN_SECRET'),
      passReqToCallback: true,
    });
  }
  async validate(
    req: Request,
    payload: JwtPayload,
  ): Promise<JwtPayloadWithRefreshToken> {
    const refreshToken = req
      ?.get('authorization')
      ?.replace('Bearer', '')
      .trim();

    console.log(payload, 'payload!');
    return {
      ...payload,
      refreshToken,
    };
  }
}
