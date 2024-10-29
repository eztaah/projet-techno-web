import { Repository } from 'typeorm';
import { ReviewEntity } from './review.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectRepository(ReviewEntity)
    private readonly reviewRepository: Repository<ReviewEntity>
  ) {}

  // Add this create method
  create(reviewData: Partial<ReviewEntity>): ReviewEntity {
    return this.reviewRepository.create(reviewData);
  }

  async saveReview(review: ReviewEntity) {
    return this.reviewRepository.save(review);
  }

  async findReviewsForBook(bookId: string, order: 'ASC' | 'DESC') {
    return this.reviewRepository.find({
      where: { book: { id: bookId } },
      order: { createdAt: order },
    });
  }
}
