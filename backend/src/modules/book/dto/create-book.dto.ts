import { IsString, IsInt, IsOptional, IsNumber } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsInt()
  publicationYear: number;

  @IsString()
  authorId: string;

  @IsOptional()
  @IsNumber()
  price?: number; 
}
