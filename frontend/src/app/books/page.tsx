'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchBooks, createBook } from '../../services/bookService';
import CreateBookModal from '../../components/CreateBookModal';
import Breadcrumb from '../../components/Breadcrumb';

export default function BookList() {
  const [books, setBooks] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const loadBooks = async () => {
    const data = await fetchBooks();
    setBooks(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleCreateBook = async (newBook) => {
    await createBook(newBook);
    loadBooks(); // Recharger la liste après ajout
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
            <Link
              href={`/books/${book.id}`}
              className="text-blue-500 hover:underline"
            >
              {book.title} by {book.author.name}
            </Link>
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
