import { ConflictException, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { UserRepository } from './repository/user.repository';
import * as bcrypt from 'bcryptjs';
import { GetUserProfileDto } from './dto/get-user-profile.dto';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

  async signUp(registerUserDto: RegisterUserDto): Promise<void> {
    const { username, email, password } = registerUserDto;
    if (await this.userRepo.findByEmail(email))
      throw new ConflictException('Email exists');
    if (await this.userRepo.findByUsername(username))
      throw new ConflictException('Username exists');

    // convert string into hash
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // register user
    await this.userRepo.save({
      username,
      email,
      hashedPassword,
      displayName: username,
    });
  }

  async findProfileById(userId: string): Promise<GetUserProfileDto> {
    const user = await this.userRepo.findById(userId);
    return {
      id: user.id,
      email: user.email,
      username: user.username,
      isEmailVerified: user.isEmailVerified,
      mention: user.mention,
      photoUrl: user.photoUrl,
    };
  }
}
