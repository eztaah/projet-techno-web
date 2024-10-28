import { IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateAuthorDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  @IsUrl()
  photo?: string;
}
