'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAuthors } from '../../services/authorService';

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors().then((data) => setAuthors(Array.isArray(data) ? data : []));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id} className="bg-white p-4 rounded shadow mb-2">
            <Link href={`/authors/${author.id}`} className="text-blue-500 hover:underline">
              {author.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
