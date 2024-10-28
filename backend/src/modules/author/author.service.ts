import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { AuthorEntity } from './author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { BookEntity } from '../book/book.entity';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>
  ) {}

  async createAuthor(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    return this.authorRepository.save(author);
  }

  async getAuthors() {
    const authors = await this.authorRepository.find({
      where: { name: Not('Deleted author') },
      relations: ['books'],
    });

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

    if (author.name === 'Deleted author') {
      return {
        id: author.id,
        name: author.name,
        bio: author.bio,
      };
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

  async getDeletedAuthor(): Promise<AuthorEntity> {
    let deletedAuthor = await this.authorRepository.findOne({
      where: { name: 'Deleted author' },
    });

    if (!deletedAuthor) {
      deletedAuthor = this.authorRepository.create({
        id: 'deleted-author',
        name: 'Deleted author',
        bio: 'This author has been deleted.',
      });
      await this.authorRepository.save(deletedAuthor);
    }

    return deletedAuthor;
  }

  async deleteAuthor(id: string) {
    const author = await this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    if (author.name === 'Deleted author') {
      throw new BadRequestException('Cannot delete the "Deleted author".');
    }

    const deletedAuthor = await this.getDeletedAuthor();

    for (const book of author.books) {
      book.author = deletedAuthor;
      await this.bookRepository.save(book);
    }

    await this.authorRepository.remove(author);

    return {
      message:
        'Author deleted successfully and books reassigned to "Deleted author".',
    };
  }

  async updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepository.findOne({ where: { id } });

    if (!author) {
      throw new NotFoundException('Author not found');
    }

    // Mise à jour des champs de l'auteur
    Object.assign(author, updateAuthorDto);
    return this.authorRepository.save(author);
  }
}
