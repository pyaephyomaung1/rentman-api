import { IsOptional, IsString } from 'class-validator';

export class UpdateWorkspaceDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  region: string;

  @IsString()
  @IsOptional()
  address: string;
}
