'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuthorProvider } from '../../providers/useAuthorProvider';
import CreateAuthorModal from '../../components/CreateAuthorModal';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/Button'; // Ajout de l'import manquant

export default function AuthorList() {
  const { authors, isModalOpen, setModalOpen, addAuthor } = useAuthorProvider();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">Authors</h1>

      <input
        type="text"
        placeholder="search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <Button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add New Author
      </Button>

      <ul>
        {filteredAuthors.map((author) => (
          <li
            key={author.id}
            className="bg-white p-4 rounded shadow mb-2 flex items-center"
          >
            {author.photo && (
              <img
                src={author.photo}
                alt={author.name}
                className="w-16 h-16 rounded-full mr-4"
              />
            )}
            <div>
              <Link
                href={`/authors/${author.id}`}
                className="text-blue-500 hover:underline"
              >
                {author.name}
              </Link>
              <p className="text-gray-600">Books written: {author.bookCount}</p>
            </div>
          </li>
        ))}
      </ul>

      <CreateAuthorModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={addAuthor}
      />
    </div>
  );
}
