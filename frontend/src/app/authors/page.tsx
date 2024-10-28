'use client';
import { useEffect, useState } from 'react';
import { fetchAuthors } from '../../services/authorService';

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    fetchAuthors()
      .then((data) => setAuthors(Array.isArray(data) ? data : [])) 
      .catch((error) => {
        console.error("Failed to fetch authors:", error);
        setAuthors([]); 
      });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <ul>
        {authors.map((author) => (
          <li key={author.id} className="bg-white p-4 rounded shadow mb-2">
            {author.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
