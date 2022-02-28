import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GetUser } from './decorator/get-user.decorator';
import { GetTokenDto } from './dto/get-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { SignUpDto } from './dto/sign-up.dto';
import { User } from './entity/user.entity';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { UserService } from './user.service';

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
  async getMyProfile(@GetUser() me: User): Promise<User> {
    return me;
  }

  @Get('search')
  async getUserInfo(): Promise<User> {
    return ;
  }
}
