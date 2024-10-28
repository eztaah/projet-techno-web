'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchBookById } from '../../../services/bookService';
import Breadcrumb from '../../../components/Breadcrumb';
import Link from 'next/link';

interface Author {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  price: number;
  publicationYear: number;
  author: Author;
}

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<Book | null>(null);

  useEffect(() => {
    if (id) {
      fetchBookById(id).then(setBook).catch(console.error);
    }
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg mb-2">Price: ${book.price}</p>
      <p className="text-lg mb-2">Publication Year: {book.publicationYear}</p>
      <p className="text-lg">
        Author: <Link href={`/authors/${book.author.id}`} className="text-blue-500 hover:underline">
          {book.author.name}
        </Link>
      </p>
    </div>
  );
}
