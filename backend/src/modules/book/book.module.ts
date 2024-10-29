import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookEntity } from './book.entity';
import { AuthorEntity } from '../author/author.entity';
import { BookRepository } from './book.repository'; // Import du BookRepository

@Module({
  imports: [TypeOrmModule.forFeature([BookEntity, AuthorEntity])],
  controllers: [BookController],
  providers: [BookService, BookRepository], // Ajout de BookRepository dans les providers
})
export class BookModule {}
