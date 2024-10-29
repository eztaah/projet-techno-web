// backend/src/modules/review/review.controller.ts
import { Controller, Post, Get, Param, Body, Query } from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';

@Controller('books/:bookId/reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  async createReview(
    @Param('bookId') bookId: string,
    @Body() createReviewDto: CreateReviewDto
  ) {
    return this.reviewService.createReview(bookId, createReviewDto);
  }

  @Get()
  async getReviews(
    @Param('bookId') bookId: string,
    @Query('order') order: 'ASC' | 'DESC' = 'ASC'
  ) {
    return this.reviewService.getReviewsForBook(bookId, order);
  }
}
