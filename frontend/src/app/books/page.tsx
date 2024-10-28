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
  const [searchQuery, setSearchQuery] = useState(''); // state for search text
  const [sortOption, setSortOption] = useState('title-asc'); // state for sorting option

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

  // filter books based on search text
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // sort books based on the selected option
  const sortedBooks = [...filteredBooks].sort((a, b) => {
    switch (sortOption) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'year-desc':
        return b.publicationYear - a.publicationYear;
      case 'year-asc':
        return a.publicationYear - b.publicationYear;
      default:
        return 0;
    }
  });

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">Books</h1>

      {/* search bar */}
      <input
        type="text"
        placeholder="search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      {/* sort dropdown */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      >
        <option value="title-asc">Title (A-Z)</option>
        <option value="title-desc">Title (Z-A)</option>
        <option value="year-desc">Publication Year (Newest)</option>
        <option value="year-asc">Publication Year (Oldest)</option>
      </select>

      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add New Book
      </button>

      <ul>
        {sortedBooks.map((book) => (
          <li key={book.id} className="bg-white p-4 rounded shadow mb-2">
            <Link
              href={`/books/${book.id}`}
              className="text-blue-500 hover:underline"
            >
              {book.title}
            </Link>
            <p className="text-gray-600">
              Publication Year: {book.publicationYear}
            </p>
            <p className="text-gray-600">
              Author:{' '}
              <Link
                href={`/authors/${book.author.id}`}
                className="text-blue-500 hover:underline"
              >
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
