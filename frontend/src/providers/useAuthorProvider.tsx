'use client';
import { useEffect, useState } from 'react';
import { fetchAuthors, createAuthor } from '../services/authorService';
import { Author } from '../models/Author';

export const useAuthorProvider = () => {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const loadAuthors = async () => {
    const data = await fetchAuthors();
    setAuthors(data);
  };

  const addAuthor = async (newAuthor: Omit<Author, 'id' | 'bookCount'>) => {
    await createAuthor(newAuthor);
    loadAuthors();
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  return {
    authors,
    isModalOpen,
    setModalOpen,
    addAuthor,
  };
};
