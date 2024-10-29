// app/books/page.tsx

'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useBookProvider } from '../../providers/useBookProvider';
import Button from '../../components/Button';
import Modal from '../../components/Modal';

export default function BookList() {
  const { books, isModalOpen, setModalOpen, addBook } = useBookProvider();
  const [searchQuery, setSearchQuery] = useState('');

  const handleCreateBook = (title: string, authorId: string, year: number) => {
    addBook({
      title,
      author: { id: authorId, name: '' },
      publicationYear: year,
    });
    setModalOpen(false);
  };

  return (
    <div>
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
        className="bg-green-500 text-white"
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
            </li>
          ))}
      </ul>

      <Modal
        isOpen={isModalOpen}
        title="Add New Book"
        onClose={() => setModalOpen(false)}
      >
        {/* Form elements and logic for creating a book */}
      </Modal>
    </div>
  );
}
