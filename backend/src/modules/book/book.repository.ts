import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { AuthorEntity } from '../author/author.entity';
import { ReviewEntity } from '../review/review.entity';

@Injectable()
export class BookRepository {
  constructor(
    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,

    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>
  ) {}

  async saveBook(book: BookEntity) {
    return this.bookRepository.save(book);
  }

  async findBooks() {
    return this.bookRepository.find({
      relations: ['author'],
      select: ['id', 'title', 'publicationYear', 'price'],
    });
  }

  async findBookById(id: string) {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  async deleteBook(id: string) {
    return this.bookRepository.delete(id);
  }

  async findAuthorById(authorId: string) {
    return this.authorRepository.findOne({ where: { id: authorId } });
  }

  async getAverageRating(bookId: string): Promise<number | null> {
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'avgRating')
      .where('review.bookId = :bookId', { bookId })
      .getRawOne();

    return result ? parseFloat(result.avgRating) : null;
  }

  async findBooksWithRatings() {
    const books = await this.bookRepository.find({ relations: ['author'] });
    for (const book of books) {
      book['averageRating'] = await this.getAverageRating(book.id); // Add average rating to each book
    }
    return books;
  }

  // Ajout de la méthode `create` pour instancier un BookEntity
  create(bookData: Partial<BookEntity>): BookEntity {
    return this.bookRepository.create(bookData);
  }
}
