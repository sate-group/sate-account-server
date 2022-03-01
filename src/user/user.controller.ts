import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { User } from './entity/user.entity';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserService } from './user.service';
import { GetTokenDto } from 'src/auth/dto/get-token.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { GetUserId } from './decorator/get-user-id.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<GetTokenDto> {
    return await this.userService.signUp(signUpDto);
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<GetTokenDto> {
    return this.userService.signIn(signInDto);
  }

  @Get('myprofile')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@GetUserId() userId: string): Promise<User> {
    const user = await this.userService.findById(userId);
    return user;
  }

  @Get('search')
  async getUserInfo(): Promise<User> {
    return;
  }
}
