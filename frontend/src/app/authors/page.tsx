'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAuthors, createAuthor } from '../../services/authorService';
import CreateAuthorModal from '../../components/CreateAuthorModal';
import Breadcrumb from '../../components/Breadcrumb';

interface Author {
  id: string;
  name: string;
  photo?: string;
  bookCount: number;
}

export default function AuthorList() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(''); // state for search text

  const loadAuthors = async () => {
    const data = await fetchAuthors();
    setAuthors(data);
  };

  useEffect(() => {
    loadAuthors();
  }, []);

  const handleCreateAuthor = async (newAuthor) => {
    await createAuthor(newAuthor);
    loadAuthors(); // reload author page after adding one
  };

  // filter authors based on search text
  const filteredAuthors = authors.filter((author) =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">Authors</h1>

      {/* search bar */}
      <input
        type="text"
        placeholder="search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <button
        onClick={() => setModalOpen(true)}
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add New Author
      </button>

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
        onSubmit={handleCreateAuthor}
      />
    </div>
  );
}
