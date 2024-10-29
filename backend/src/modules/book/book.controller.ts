import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookPresenter } from './book.presenter';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  public async create(
    @Body() createBookDto: CreateBookDto
  ): Promise<BookPresenter> {
    console.log(`Request received to create a new book.`);
    console.log(`Book data: ${JSON.stringify(createBookDto, null, 2)}`);

    return this.bookService
      .createBook(createBookDto)
      .then((book: BookPresenter) => {
        console.log(`Book created successfully with id: ${book.id}`);
        return book;
      })
      .catch((error: Error) => {
        console.error(`Error creating book: ${error.message}`);
        throw error;
      });
  }

  @Get()
  public async findAll(): Promise<BookPresenter[]> {
    console.log('Request received to fetch all books');

    return this.bookService
      .getBooks()
      .then((books: BookPresenter[]) => {
        console.log(`Fetched ${books.length} books.`);

        if (books.length > 0) {
          console.log(`Sample book data: ${JSON.stringify(books[0], null, 2)}`);
        }

        return books;
      })
      .catch((error: Error) => {
        console.error(`Error fetching books: ${error.message}`);
        throw error;
      });
  }

  @Get(':id')
  public async findOne(@Param('id') id: string): Promise<BookPresenter> {
    console.log(`Request received to fetch book with id: "${id}"`);

    try {
      const book = await this.bookService.getBookById(id);
      if (!book) {
        console.warn(`Book with id "${id}" not found`);
        throw new NotFoundException('Book not found');
      }
      console.log(`Book found: ${JSON.stringify(book, null, 2)}`);
      return book;
    } catch (error) {
      console.error(`Error fetching book with id "${id}": ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  public async delete(@Param('id') id: string): Promise<{ message: string }> {
    console.log(`Request received to delete book with id: "${id}"`);

    try {
      const result = await this.bookService.deleteBook(id);
      console.log(`Book with id "${id}" deleted successfully.`);
      return result;
    } catch (error) {
      console.error(`Error deleting book with id "${id}": ${error.message}`);
      throw error;
    }
  }
}
