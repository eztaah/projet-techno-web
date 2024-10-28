'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchBooks, createBook } from '../../services/bookService';
import Breadcrumb from '../../components/Breadcrumb';
import CreateBookModal from '../../components/CreateBookModal';

interface Book {
  id: string;
  title: string;
  publicationYear: number;
  author: {
    id: string;
    name: string;
  };
}

export default function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const loadBooks = async () => {
    const data = await fetchBooks();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleCreateBook = async (newBook) => {
    await createBook(newBook);
    loadBooks(); // Recharger la liste des livres après ajout
  };

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add New Book
      </button>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="bg-white p-4 rounded shadow mb-2">
            <Link href={`/books/${book.id}`} className="text-blue-500 hover:underline">
              {book.title}
            </Link>
            <p className="text-gray-600">
              Publication Year: {book.publicationYear}
            </p>
            <p className="text-gray-600">
              Author: <Link href={`/authors/${book.author.id}`} className="text-blue-500 hover:underline">
                {book.author.name}
              </Link>
            </p>
          </li>
        ))}
      </ul>
      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateBook}
      />
    </div>
  );
}
