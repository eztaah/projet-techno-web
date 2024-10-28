'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAuthors, createAuthor } from '../../services/authorService';
import CreateAuthorModal from '../../components/CreateAuthorModal';

export default function AuthorList() {
  const [authors, setAuthors] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);

  const loadAuthors = async () => {
    const data = await fetchAuthors();
    setAuthors(Array.isArray(data) ? data : []);
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const handleCreateAuthor = async (newAuthor) => {
    await createAuthor(newAuthor);
    loadAuthors();  // Recharger la liste des auteurs après ajout
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Authors</h1>
      <button onClick={() => setModalOpen(true)} className="mb-4 px-4 py-2 bg-green-500 text-white rounded">Add New Author</button>
      <ul>
        {authors.map((author) => (
          <li key={author.id} className="bg-white p-4 rounded shadow mb-2">
            <Link href={`/authors/${author.id}`} className="text-blue-500 hover:underline">
              {author.name}
            </Link>
          </li>
        ))}
      </ul>
      <CreateAuthorModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleCreateAuthor}
      />
    </div>
  );
}
