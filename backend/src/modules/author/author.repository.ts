import { Injectable } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
import { BookEntity } from '../book/book.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>
  ) {}

  async saveAuthor(author: AuthorEntity) {
    return this.authorRepository.save(author);
  }

  async findAuthors() {
    return this.authorRepository.find({
      where: { name: Not('Deleted author') },
      relations: ['books'],
    });
  }

  async findAuthorById(id: string) {
    return this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }

  async findDeletedAuthor() {
    return this.authorRepository.findOne({
      where: { name: 'Deleted author' },
    });
  }

  async deleteAuthor(author: AuthorEntity) {
    return this.authorRepository.remove(author);
  }

  async saveBook(book: BookEntity) {
    return this.bookRepository.save(book);
  }

  // Ajout de la méthode `create` pour instancier un AuthorEntity
  create(authorData: Partial<AuthorEntity>): AuthorEntity {
    return this.authorRepository.create(authorData);
  }
}
