// frontend/src/services/reviewService.ts

import { api } from './api';

export async function fetchReviews(bookId: string, order: 'ASC' | 'DESC') {
  const response = await api.get(`/books/${bookId}/reviews`, {
    params: { order },
  });
  return response.data;
}

export async function createReview(
  bookId: string,
  review: { rating: number; comment?: string }
) {
  const response = await api.post(`/books/${bookId}/reviews`, review);
  return response.data;
}
