import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { BookPresenter } from './book.presenter';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  async createBook(createBookDto: CreateBookDto) {
    const author = await this.bookRepository.findAuthorById(createBookDto.authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    
    const book = this.bookRepository.create({
      title: createBookDto.title,
      publicationYear: createBookDto.publicationYear,
      author: author,
      price: createBookDto.price,
    });

    return this.bookRepository.saveBook(book);
  }

  async getBooks() {
    const books = await this.bookRepository.findBooks();
    return books.map((book) => BookPresenter.fromEntity(book));
  }

  async getBookById(id: string) {
    const book = await this.bookRepository.findBookById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return BookPresenter.fromEntity(book);
  }

  async deleteBook(id: string) {
    const result = await this.bookRepository.deleteBook(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with id "${id}" not found`);
    }
    return { message: 'Book deleted successfully' };
  }
}
