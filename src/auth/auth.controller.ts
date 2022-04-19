import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async createUser(@Body() createUserDTO: CreateUser): Promise<null> {
    return;
  }

  @Get()
  async readUser(): Promise<null> {
    return;
  }

  @Patch()
  async updateUser(): Promise<null> {
    return;
  }

  @Delete()
  async deleteUser(): Promise<null> {
    return;
  }
}
