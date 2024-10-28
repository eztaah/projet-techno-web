import { IsString, IsInt, IsUUID } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsInt()
  publicationYear: number;

  @IsUUID()
  authorId: string;
}
