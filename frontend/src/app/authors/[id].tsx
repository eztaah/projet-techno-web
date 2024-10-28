'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchAuthorById } from '../../services/authorService';

export default function AuthorDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (id) {
      fetchAuthorById(id as string).then(setAuthor);
    }
  }, [id]);

  if (!author) return <p>Loading...</p>;

  return (
    <div>
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
