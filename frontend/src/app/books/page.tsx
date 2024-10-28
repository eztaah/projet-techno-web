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
  const [searchQuery, setSearchQuery] = useState('');  // state for search text

  const loadBooks = async () => {
    const data = await fetchBooks();
    setBooks(data);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const handleCreateBook = async (newBook) => {
    await createBook(newBook);
    loadBooks(); // reload book list after adding a new book
  };

  // Filtrer les livres en fonction du texte de recherche
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">Books</h1>

      {/* search bar */}
      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add New Book
      </button>

      <ul>
        {filteredBooks.map((book) => (
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
