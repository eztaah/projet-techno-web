import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { AuthorRepository } from './author.repository';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { AuthorPresenter } from './author.presenter';

@Injectable()
export class AuthorService {
  constructor(private readonly authorRepository: AuthorRepository) {}

  async createAuthor(createAuthorDto: CreateAuthorDto) {
    const author = this.authorRepository.create(createAuthorDto);
    const savedAuthor = await this.authorRepository.saveAuthor(author);
    return AuthorPresenter.fromEntity(savedAuthor);
  }

  async getAuthors() {
    const authors = await this.authorRepository.findAuthors();
    return authors.map((author) => AuthorPresenter.fromEntity(author));
  }

  async getAuthorById(id: string) {
    const author = await this.authorRepository.findAuthorById(id);
    if (!author) {
      return null;
    }
    return AuthorPresenter.fromEntity(author);
  }

  async getDeletedAuthor() {
    let deletedAuthor = await this.authorRepository.findDeletedAuthor();
    if (!deletedAuthor) {
      deletedAuthor = this.authorRepository.create({
        id: 'deleted-author',
        name: 'Deleted author',
        bio: 'This author has been deleted.',
      });
      await this.authorRepository.saveAuthor(deletedAuthor);
    }
    return deletedAuthor;
  }

  async deleteAuthor(id: string) {
    const author = await this.authorRepository.findAuthorById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    if (author.name === 'Deleted author') {
      throw new BadRequestException('Cannot delete the "Deleted author".');
    }
    const deletedAuthor = await this.getDeletedAuthor();
    for (const book of author.books) {
      book.author = deletedAuthor;
      await this.authorRepository.saveBook(book);
    }
    await this.authorRepository.deleteAuthor(author);

    return {
      message: 'Author deleted successfully and books reassigned to "Deleted author".',
    };
  }

  async updateAuthor(id: string, updateAuthorDto: UpdateAuthorDto) {
    const author = await this.authorRepository.findAuthorById(id);
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    Object.assign(author, updateAuthorDto);
    const updatedAuthor = await this.authorRepository.saveAuthor(author);
    return AuthorPresenter.fromEntity(updatedAuthor);
  }
}
