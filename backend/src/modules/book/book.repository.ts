import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { AuthorEntity } from '../author/author.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>
  ) {}

  async saveBook(book: BookEntity) {
    return this.bookRepository.save(book);
  }

  async findBooks() {
    return this.bookRepository.find({
      relations: ['author'],
      select: ['id', 'title', 'publicationYear', 'price'],
    });
  }

  async findBookById(id: string) {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async deleteBook(id: string) {
    return this.bookRepository.delete(id);
  }

  async findAuthorById(authorId: string) {
    return this.authorRepository.findOne({ where: { id: authorId } });
  }

  // Ajout de la méthode `create` pour instancier un BookEntity
  create(bookData: Partial<BookEntity>): BookEntity {
    return this.bookRepository.create(bookData);
  }
}
