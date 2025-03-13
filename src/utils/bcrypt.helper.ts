import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyHash(
  password: string,
  hash: string,
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(
  user: any,
  jwtService: JwtService,
): { accessToken: string } {
  const payload = { email: user.email, sub: user.id };
  return {
    accessToken: jwtService.sign(payload),
  };
}
