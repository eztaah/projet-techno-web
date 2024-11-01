'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useAuthorProvider } from '../../providers/useAuthorProvider';
import CreateAuthorModal from '../../components/CreateAuthorModal';
import Breadcrumb from '../../components/Breadcrumb';
import Button from '../../components/ButtonPrimary';
import StarIcon from '@mui/icons-material/Star';

export default function AuthorList(): JSX.Element {
  const { authors, isModalOpen, setModalOpen, addAuthor } = useAuthorProvider();
  const [searchQuery, setSearchQuery] = useState<string>('');

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
              {author.weightedAverageRating !== undefined &&
              author.weightedAverageRating !== null ? (
                <div className="flex items-center">
                  <p className="text-gray-600 mr-2">Average Rating:</p>
                  <div className="flex items-center">
                    {[...Array(Math.round(author.weightedAverageRating))].map(
                      (_, i) => (
                        <StarIcon key={i} className="text-yellow-500" />
                      )
                    )}
                    <p className="ml-1">
                      ({author.weightedAverageRating.toFixed(1)})
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500">No reviews yet</p>
              )}
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
