import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './jwt-constants';
import { JwtPayloadKey } from './jwt-payload-key.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // constructor(private readonly userService: UserService) {
  constructor() {
    super({
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payloadKey: JwtPayloadKey): Promise<JwtPayloadKey> {
    return { ...payloadKey };
  }
}
