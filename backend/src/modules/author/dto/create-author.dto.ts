import { IsString, IsOptional } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public bio?: string;

  @IsOptional()
  @IsString()
  public photo?: string;
}
