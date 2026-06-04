import { IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  region: string;

  @IsString()
  address: string;
}
