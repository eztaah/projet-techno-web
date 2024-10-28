import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

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

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.authorService.deleteAuthor(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto
  ) {
    return this.authorService.updateAuthor(id, updateAuthorDto);
  }
}
