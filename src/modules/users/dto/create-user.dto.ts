import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  profileImageUrl: string;
}
