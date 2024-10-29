'use client';
import { useEffect, useState } from 'react';
import { fetchBooks, createBook, deleteBook } from '../services/bookService';
import { Book } from '../models/Book';

export const useBookProvider = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const loadBooks = async () => {
    const data = await fetchBooks();
    setBooks(data);
  };

  const addBook = async (newBook: Omit<Book, 'id'>) => {
    await createBook(newBook);
    loadBooks();
  };

  const removeBook = async (bookId: string) => {
    await deleteBook(bookId);
    loadBooks();
  };

  useEffect(() => {
    loadBooks();
  }, []);

  return {
    books,
    isModalOpen,
    setModalOpen,
    addBook,
    removeBook,
  };
};
