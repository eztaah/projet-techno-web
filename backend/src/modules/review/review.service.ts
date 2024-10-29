// backend/src/modules/review/review.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { BookRepository } from '../book/book.repository';
import { CreateReviewDto } from './dto/create-review.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly bookRepository: BookRepository
  ) {}

  async createReview(bookId: string, createReviewDto: CreateReviewDto) {
    const book = await this.bookRepository.findBookById(bookId);
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const review = this.reviewRepository.create({
      ...createReviewDto,
      book,
    });

    return this.reviewRepository.saveReview(review);
  }

  async getReviewsForBook(bookId: string, order: 'ASC' | 'DESC') {
    return this.reviewRepository.findReviewsForBook(bookId, order);
  }
}
