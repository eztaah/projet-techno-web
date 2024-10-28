'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchAuthorById } from '../../../services/authorService';
import Breadcrumb from '../../../components/Breadcrumb';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  publicationYear: number;
}

interface Author {
  id: string;
  name: string;
  bio?: string;
  photo?: string;
  books: Book[];
}

export default function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState<Author | null>(null);

  useEffect(() => {
    if (id) {
      fetchAuthorById(id).then(setAuthor).catch(console.error);
    }
  }, [id]);

  if (!author) return <p>Loading...</p>;

  return (
    <div>
      <Breadcrumb />
      <div className="flex items-center mb-4">
        {author.photo && (
          <img
            src={author.photo}
            alt={author.name}
            className="w-32 h-32 rounded-full mr-4"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{author.name}</h1>
          <p className="text-gray-600">{author.bio}</p>
        </div>
      </div>
      <h2 className="text-xl font-bold mt-4">Books by this author:</h2>
      <ul>
        {author.books.map((book) => (
          <li key={book.id} className="bg-gray-100 p-2 rounded mb-2">
            <Link
              href={`/books/${book.id}`}
              className="text-blue-500 hover:underline"
            >
              {book.title} ({book.publicationYear})
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
