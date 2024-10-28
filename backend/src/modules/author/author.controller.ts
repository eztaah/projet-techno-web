import { Controller, Get, Post, Body, Param, NotFoundException } from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  create(@Body() createAuthorDto: CreateAuthorDto) {
    return this.authorService.createAuthor(createAuthorDto);
  }

  @Get()
  findAll() {
    return this.authorService.getAuthors();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const author = await this.authorService.getAuthorById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }
}
