import { api } from './api';

export async function fetchBooks() {
  const response = await api.get('/books');
  return response.data;
}

export async function fetchBookById(id: string) {
  const response = await api.get(`/books/${id}`);
  return response.data;
}

export async function createBook(book: {
  title: string;
  publicationYear: number;
  authorId: string;
}) {
  const response = await api.post('/books', book);
  return response.data;
}

export async function deleteBook(id: string) {
  const response = await api.delete(`/books/${id}`);
  return response.data;
}
