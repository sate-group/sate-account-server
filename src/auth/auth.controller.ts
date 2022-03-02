import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetTokenDto } from './dto/get-token.dto';
import { SignInDto } from './dto/sign-in.dto';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<GetTokenDto> {
    return this.authService.signIn(signInDto);
  }

  @Post('check')
  @UseGuards(JwtAuthGuard)
  async checkAuth(): Promise<void> {}
}
