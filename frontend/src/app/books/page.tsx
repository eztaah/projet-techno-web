'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useBookProvider } from '../../providers/useBookProvider';
import Button from '../../components/Button';
import Breadcrumb from '../../components/Breadcrumb';
import CreateBookModal from '../../components/CreateBookModal';
import StarIcon from '@mui/icons-material/Star';

export default function BookList(): JSX.Element {
  const { books, isModalOpen, setModalOpen, addBook } = useBookProvider();
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleCreateBook = (bookData: {
    title: string;
    publicationYear: number;
    authorId: string;
    price?: number;
  }): void => {
    addBook(bookData);
    setModalOpen(false);
  };

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <input
        type="text"
        placeholder="search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <Button
        onClick={() => setModalOpen(true)}
        className="bg-green-500 text-white mb-4"
      >
        Add New Book
      </Button>

      <ul>
        {books
          .filter((book) =>
            book.title.toLowerCase().includes(searchQuery.toLowerCase())
          )
          .map((book) => (
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
              <p className="text-gray-600">Author: {book.author.name}</p>
              {book.averageRating !== undefined &&
              book.averageRating !== null ? (
                <div className="flex items-center">
                  <p className="text-gray-600 mr-2">Average Rating:</p>
                  <div className="flex items-center">
                    {[...Array(Math.round(book.averageRating))].map((_, i) => (
                      <StarIcon key={i} className="text-yellow-500" />
                    ))}
                    <p className="ml-1">({book.averageRating.toFixed(1)})</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
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
