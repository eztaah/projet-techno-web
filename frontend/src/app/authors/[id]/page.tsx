'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchAuthorById } from '../../../services/authorService';
import Breadcrumb from '../../../components/Breadcrumb';

export default function AuthorDetail() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (id) {
      fetchAuthorById(id).then(setAuthor).catch(console.error);
    }
  }, [id]);

  if (!author) return <p>Loading...</p>;

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">{author.name}</h1>
      <p>{author.bio}</p>
      <h2 className="text-xl font-bold mt-4">Books by this author:</h2>
      <ul>
        {author.books.map((book) => (
          <li key={book.id} className="bg-gray-100 p-2 rounded mb-2">
            {book.title} ({book.publicationYear})
          </li>
        ))}
      </ul>
    </div>
  );
}
