'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchBooks } from '../../services/bookService';

export default function BookList() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks().then((data) => setBooks(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id} className="bg-white p-4 rounded shadow mb-2">
            <Link href={`/books/${book.id}`} className="text-blue-500 hover:underline">
              {book.title} by {book.author.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
