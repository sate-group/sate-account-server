import { IsJWT, IsNotEmpty, IsString } from "class-validator";

export class GetTokenDto {
  @IsJWT()
  accessToken: string;
}