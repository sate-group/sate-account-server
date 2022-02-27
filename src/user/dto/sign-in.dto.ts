import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SignInDto {
  @IsNotEmpty()
  @IsString()
  emailOrUsername: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
