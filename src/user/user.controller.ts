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
  signUp(@Body() signUpDto: SignUpDto): Promise<User> {
    return;
  }

  @Post('signin')
  signIn(@Body() signInDto: SignInDto): Promise<GetTokenDto> {
    return;
  }

  @Get('getuser')
  @UseGuards(JwtAuthGuard)
  async readOwnInfo(@GetUser() user: User): Promise<User> {
    return user;
  }
}
