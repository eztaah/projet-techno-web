import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  public title: string;

  @IsInt()
  public publicationYear: number;

  @IsString()
  public authorId: string;

  @IsOptional()
  @IsNumber()
  public price?: number;
}
