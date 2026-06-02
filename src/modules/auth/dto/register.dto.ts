import { IsEmail, IsOptional, IsString } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  username: string;

  @IsString()
  password: string;

  @IsString()
  phoneNumber: string;

  @IsString()
  @IsOptional()
  profileImageUrl: string;
}
