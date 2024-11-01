'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useBookProvider } from '../../providers/useBookProvider';
import Button from '../../components/ButtonPrimary';
import Breadcrumb from '../../components/Breadcrumb';
import CreateBookModal from '../../components/CreateBookModal';
import StarIcon from '@mui/icons-material/Star';

type SortOption = 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc';

export default function BookList(): JSX.Element {
  const { books, isModalOpen, setModalOpen, addBook } = useBookProvider();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortOption, setSortOption] = useState<SortOption>('title-asc');

  const handleCreateBook = (bookData: {
    title: string;
    publicationYear: number;
    authorId: string;
    price?: number;
  }): void => {
    addBook(bookData);
    setModalOpen(false);
  };

  const sortedBooks = [...books].sort((a, b) => {
    switch (sortOption) {
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      case 'price-asc':
        return (a.price ?? 0) - (b.price ?? 0);
      case 'price-desc':
        return (b.price ?? 0) - (a.price ?? 0);
      case 'rating-asc':
        return (a.averageRating ?? 0) - (b.averageRating ?? 0);
      case 'rating-desc':
        return (b.averageRating ?? 0) - (a.averageRating ?? 0);
      default:
        return 0;
    }
  });

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

      <div className="flex items-center space-x-4 mb-4">
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-green-500 text-white"
        >
          Add New Book
        </Button>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="p-2 border rounded"
        >
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="rating-asc">Rating (Low to High)</option>
          <option value="rating-desc">Rating (High to Low)</option>
        </select>
      </div>

      <ul>
        {sortedBooks
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
              <p className="text-gray-600">Price: ${book.price?.toFixed(2) ?? 'N/A'}</p>
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
