import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { GetTokenDto } from 'src/auth/dto/get-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entity/user.entity';
import { UserRepository } from './repository/user.repository';
import { validate as emailValidate } from 'email-validator';
import * as bcrypt from 'bcryptjs';
import { JwtPayloadKey } from 'src/auth/jwt/jwt-payload-key.interface';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly authService: AuthService,
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
    const payloadKey: JwtPayloadKey = {
      userId: user.id,
    };
    return await this.authService.generateAccessToken(payloadKey);
  }

  async signIn(signInDto: SignInDto): Promise<GetTokenDto> {
    const { emailOrUsername, password } = signInDto;
    const user: User = emailValidate(emailOrUsername)
      ? await this.findByEmail(emailOrUsername)
      : await this.findByUsername(emailOrUsername);

    if (!user) throw new NotFoundException('User not exists');

    const checkPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!checkPassword) throw new UnauthorizedException('Wrong password');

    const payloadKey: JwtPayloadKey = {
      userId: user.id,
    };
    return await this.authService.generateAccessToken(payloadKey);
  }

  async findById(id: string): Promise<User> {
    const user = await this.userRepo.findOne({ id });
    return user;
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
