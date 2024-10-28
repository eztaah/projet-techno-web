import { api } from './api';

export async function fetchBooks() {
  const response = await api.get('/books');
  return response.data;
}

export async function fetchBookById(id: string) {
  const response = await api.get(`/books/${id}`);
  return response.data;
}
