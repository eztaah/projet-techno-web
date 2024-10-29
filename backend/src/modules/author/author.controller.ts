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
    // Log basic info and full JSON of the new author data
    console.log(`Request received to create a new author.`);
    console.log(`Author data: ${JSON.stringify(createAuthorDto, null, 2)}`);
    
    return this.authorService.createAuthor(createAuthorDto)
      .then(author => {
        console.log(`Author created successfully with id: ${author.id}`);
        return author;
      })
      .catch(error => {
        console.error(`Error creating author: ${error.message}`);
        throw error;
      });
  }

  @Get()
  findAll() {
    console.log('Request received to fetch all authors');
    
    return this.authorService.getAuthors()
      .then(authors => {
        // Log a summary of the fetched authors, not full details
        console.log(`Fetched ${authors.length} authors.`);
        
        return authors;
      })
      .catch(error => {
        console.error(`Error fetching authors: ${error.message}`);
        throw error;
      });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log(`Request received to fetch author with id: "${id}"`);
    
    try {
      const author = await this.authorService.getAuthorById(id);
      if (!author) {
        console.warn(`Author with id "${id}" not found`);
        throw new NotFoundException('Author not found');
      }
      // Log the full details of the author if found
      console.log(`Author found: ${JSON.stringify(author, null, 2)}`);
      return author;
    } catch (error) {
      console.error(`Error fetching author with id "${id}": ${error.message}`);
      throw error;
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    console.log(`Request received to delete author with id: "${id}"`);
    
    try {
      const result = await this.authorService.deleteAuthor(id);
      console.log(`Author with id "${id}" deleted successfully.`);
      return result;
    } catch (error) {
      console.error(`Error deleting author with id "${id}": ${error.message}`);
      throw error;
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAuthorDto: UpdateAuthorDto
  ) {
    // Log update request with id and partial data provided
    console.log(`Request received to update author with id: "${id}"`);
    console.log(`Update data: ${JSON.stringify(updateAuthorDto, null, 2)}`);
    
    try {
      const updatedAuthor = await this.authorService.updateAuthor(id, updateAuthorDto);
      console.log(`Author with id "${id}" updated successfully.`);
      return updatedAuthor;
    } catch (error) {
      console.error(`Error updating author with id "${id}": ${error.message}`);
      throw error;
    }
  }
}
