import { Injectable } from '@nestjs/common';
import { Repository, Not } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthorEntity } from './author.entity';
import { ReviewEntity } from '../review/review.entity';
import { BookEntity } from '../book/book.entity';

@Injectable()
export class AuthorRepository {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepository: Repository<AuthorEntity>,

    @InjectRepository(BookEntity)
    private readonly bookRepository: Repository<BookEntity>,

    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>
  ) {}

  async getWeightedAverageRatingForAuthor(
    authorId: string
  ): Promise<number | null> {
    const result = await this.reviewRepository
      .createQueryBuilder('review')
      .select('AVG(review.rating)', 'weightedAverage')
      .innerJoin('review.book', 'book')
      .where('book.authorId = :authorId', { authorId })
      .getRawOne();

    return result && result.weightedAverage
      ? parseFloat(result.weightedAverage)
      : null;
  }

  async findAuthorsWithWeightedRatings() {
    const authors = await this.authorRepository.find({
      where: { name: Not('Deleted author') },
      relations: ['books'],
    });
    for (const author of authors) {
      author['weightedAverageRating'] =
        await this.getWeightedAverageRatingForAuthor(author.id);
    }
    return authors;
  }

  async saveAuthor(author: AuthorEntity) {
    return this.authorRepository.save(author);
  }

  async findAuthors() {
    return this.authorRepository.find({
      where: { name: Not('Deleted author') },
      relations: ['books'],
    });
  }

  async findAuthorById(id: string) {
    return this.authorRepository.findOne({
      where: { id },
      relations: ['books'],
    });
  }

  async findDeletedAuthor() {
    return this.authorRepository.findOne({
      where: { name: 'Deleted author' },
    });
  }

  async deleteAuthor(author: AuthorEntity) {
    return this.authorRepository.remove(author);
  }

  async saveBook(book: BookEntity) {
    return this.bookRepository.save(book);
  }

  // Ajout de la méthode `create` pour instancier un AuthorEntity
  create(authorData: Partial<AuthorEntity>): AuthorEntity {
    return this.authorRepository.create(authorData);
  }
}
