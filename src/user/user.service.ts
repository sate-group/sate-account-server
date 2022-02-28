import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { GetTokenDto } from './dto/get-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from './jwt/jwt-payload.interface';
import { validate as emailValidate } from 'email-validator';
import { UserRepository } from './repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<GetTokenDto> {
    const { username, email, password } = signUpDto;
    if (await this.findByEmail(email))
      throw new ConflictException('Email exists');
    if (await this.findByUsername(username))
      throw new ConflictException('Username exists');

    // convert string into hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // register user
    const user = await this.userRepo.save({
      username,
      email,
      hashedPassword,
      displayName: username,
    });

    return await this.getAccessToken(user);
  }

  async signIn(signInDto: SignInDto): Promise<GetTokenDto> {
    const { emailOrUsername, password } = signInDto;
    const user: User = emailValidate(emailOrUsername)
      ? await this.findByEmail(emailOrUsername)
      : await this.findByUsername(emailOrUsername);

    const checkPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!checkPassword) throw new UnauthorizedException('Wrong password');

    return await this.getAccessToken(user);
  }

  async getAccessToken(user: User): Promise<GetTokenDto> {
    const payload: JwtPayload = { ...user };
    const accessToken = await this.jwtService.sign(payload);

    return { accessToken };
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({ email });
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepo.findOne({ username });
    return user;
  }
}
