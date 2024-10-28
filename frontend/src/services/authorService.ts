import { api } from './api';

export async function fetchAuthors() {
  const response = await api.get('/authors');
  return response.data.map((author: any) => ({
    id: author.id,
    name: author.name,
    photo: author.photo,
    bookCount: author.bookCount,
  }));
}

export async function fetchAuthorById(id: string) {
  const response = await api.get(`/authors/${id}`);
  const author = response.data;
  return {
    id: author.id,
    name: author.name,
    bio: author.bio,
    photo: author.photo,
    books: author.books,
  };
}

export async function createAuthor(author: {
  name: string;
  bio?: string;
  photo?: string;
}) {
  const response = await api.post('/authors', author);
  return response.data;
}
