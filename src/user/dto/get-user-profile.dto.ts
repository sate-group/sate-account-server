import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

export class GetUserProfileDto {
  @IsUUID()
  id: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsBoolean()
  isEmailVerified: boolean;

  @IsOptional()
  @IsString()
  mention: string;

  @IsOptional()
  @IsString()
  photoUrl: string;
}
