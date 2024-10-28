import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { AuthorEntity } from '../author/author.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async createBook(createBookDto: CreateBookDto) {
    const author = await this.authorRepository.findOne({ where: { id: createBookDto.authorId } });
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const book = this.bookRepository.create({
      ...createBookDto,
      author,
    });
    return this.bookRepository.save(book);
  }

  async getBooks() {
    return this.bookRepository.find();
  }
}
