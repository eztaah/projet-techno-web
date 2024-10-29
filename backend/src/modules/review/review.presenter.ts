// backend/src/modules/review/review.presenter.ts
import { ReviewEntity } from './review.entity';

export class ReviewPresenter {
  constructor(
    public id: string,
    public rating: number,
    public comment?: string,
    public createdAt?: Date
  ) {}

  static fromEntity(review: ReviewEntity): ReviewPresenter {
    return new ReviewPresenter(
      review.id,
      review.rating,
      review.comment,
      review.createdAt
    );
  }
}
