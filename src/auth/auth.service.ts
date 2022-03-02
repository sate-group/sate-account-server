import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/entity/user.entity';
import { UserRepository } from 'src/user/repository/user.repository';
import { GetTokenDto } from './dto/get-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtPayloadKey } from './jwt/jwt-payload-key.interface';
import { validate as emailValidate } from 'email-validator';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<GetTokenDto> {
    const { emailOrUsername, password } = signInDto;
    
    const user: User = emailValidate(emailOrUsername)
      ? await this.userRepo.findByEmail(emailOrUsername)
      : await this.userRepo.findByUsername(emailOrUsername);
    if (!user) throw new NotFoundException('User not exists');

    const checkPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!checkPassword) throw new UnauthorizedException('Wrong password');

    const payloadKey: JwtPayloadKey = {
      userId: user.id,
    };
    return await this.generateAccessToken(payloadKey);
  }



  async generateAccessToken(payloadKey: JwtPayloadKey): Promise<GetTokenDto> {
    const payload: JwtPayloadKey = payloadKey;
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }
}
