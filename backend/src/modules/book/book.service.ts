import { Injectable, NotFoundException } from '@nestjs/common';
import { BookRepository } from './book.repository';
import { CreateBookDto } from './dto/create-book.dto';
import { BookPresenter } from './book.presenter';
import { BookEntity } from './book.entity';
import { AuthorEntity } from '../author/author.entity';

@Injectable()
export class BookService {
  constructor(private readonly bookRepository: BookRepository) {}

  public async createBook(
    createBookDto: CreateBookDto
  ): Promise<BookPresenter> {
    const author: AuthorEntity | null =
      await this.bookRepository.findAuthorById(createBookDto.authorId);
    if (!author) {
      throw new NotFoundException('Author not found');
    }

    const book: BookEntity = this.bookRepository.create({
      title: createBookDto.title,
      publicationYear: createBookDto.publicationYear,
      author: author,
      price: createBookDto.price,
    });

    const savedBook: BookEntity = await this.bookRepository.saveBook(book);
    return BookPresenter.fromEntity(savedBook);
  }

  public async getBooks(): Promise<BookPresenter[]> {
    const books: BookEntity[] =
      await this.bookRepository.findBooksWithRatings();
    return books.map((book: BookEntity) => BookPresenter.fromEntity(book));
  }

  public async getBookById(id: string): Promise<BookPresenter> {
    const book: BookEntity | null = await this.bookRepository.findBookById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return BookPresenter.fromEntity(book);
  }

  public async deleteBook(id: string): Promise<{ message: string }> {
    await this.bookRepository.deleteBook(id);
    return { message: 'Book deleted successfully' };
  }
}
