import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { GetUserId } from './decorator/get-user-id.decorator';
import { GetUserProfileDto } from './dto/get-user-profile.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async signUp(@Body() registerUserDto: RegisterUserDto): Promise<void> {
    return await this.userService.signUp(registerUserDto);
  }

  @Get('myprofile')
  @UseGuards(JwtAuthGuard)
  async getMyProfile(@GetUserId() userId: string): Promise<GetUserProfileDto> {
    return await this.userService.findProfileById(userId);
  }
}
