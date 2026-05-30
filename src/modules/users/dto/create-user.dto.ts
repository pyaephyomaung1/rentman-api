import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';
import { Role } from 'src/common/enums/role';

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

  @IsString()
  role: Role;
}
