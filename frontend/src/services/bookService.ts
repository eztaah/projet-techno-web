import { api } from './api';

export async function fetchBooks() {
  const response = await api.get('/books');
  return response.data.map((book: any) => ({
    id: book.id,
    title: book.title,
    publicationYear: book.publicationYear,
    price: book.price,
    author: {
      id: book.author.id,
      name: book.author.name,
    },
  }));
}

export async function fetchBookById(id: string) {
  const response = await api.get(`/books/${id}`);
  const book = response.data;
  return {
    id: book.id,
    title: book.title,
    price: book.price,
    publicationYear: book.publicationYear,
    author: {
      id: book.author.id,
      name: book.author.name,
    },
  };
}

export async function createBook(book: {
  title: string;
  publicationYear: number;
  authorId: string;
  price?: number; 
}) {
  const response = await api.post('/books', book);
  return response.data;
}
