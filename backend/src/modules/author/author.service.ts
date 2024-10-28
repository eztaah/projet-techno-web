import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  async getAuthors() {
    return this.authorRepository.find();
  }
}
