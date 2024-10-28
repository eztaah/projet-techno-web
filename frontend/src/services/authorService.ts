import { api } from './api';

export async function fetchAuthors() {
  const response = await api.get('/authors');
  return response.data;
}

export async function fetchAuthorById(id: string) {
  const response = await api.get(`/authors/${id}`);
  return response.data;
}

export async function createAuthor(author: { name: string; bio?: string }) {
  const response = await api.post('/authors', author);
  return response.data;
}
