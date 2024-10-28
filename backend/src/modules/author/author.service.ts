import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  async getAuthors() {
    const authors = await this.authorRepository.find({ relations: ['books'] });
    return authors.map((author) => ({
      id: author.id,
      name: author.name,
      photo: author.photo,
      bookCount: author.books.length,
    }));
  }

  async getAuthorById(id: string) {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) {
      return null;
    }

    return {
      id: author.id,
      name: author.name,
      bio: author.bio,
      photo: author.photo,
      books: author.books.map((book) => ({
        id: book.id,
        title: book.title,
        publicationYear: book.publicationYear,
      })),
    };
  }
}
