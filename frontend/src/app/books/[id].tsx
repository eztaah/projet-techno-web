'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchBookById } from '../../services/bookService';

export default function BookDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);

  useEffect(() => {
    if (id) {
      fetchBookById(id as string).then(setBook);
    }
  }, [id]);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p>Author: {book.author.name}</p>
      <p>Publication Year: {book.publicationYear}</p>
    </div>
  );
}
