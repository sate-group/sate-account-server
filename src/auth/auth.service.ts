import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokenDto } from './dto/get-token.dto';
import { JwtPayloadKey } from './jwt/jwt-payload-key.interface';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(payloadKey: JwtPayloadKey): Promise<GetTokenDto> {
    const payload: JwtPayloadKey = payloadKey;
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
