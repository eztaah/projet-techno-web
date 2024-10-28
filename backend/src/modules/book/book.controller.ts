import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  @Get()
  findAll() {
    return this.bookService.getBooks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const book = await this.bookService.getBookById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
}
