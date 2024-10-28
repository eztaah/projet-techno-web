'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchAuthorById } from '../../../services/authorService';
import Breadcrumb from '../../../components/Breadcrumb';
import Link from 'next/link';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';

interface Author {
  id: string;
  name: string;
  bio?: string;
  photo?: string;
  books?: Array<{
    id: string;
    title: string;
    publicationYear: number;
  }>;
}

export default function AuthorDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAuthorById(id).then(setAuthor).catch(console.error);
    }
  }, [id]);

  const handleDelete = async () => {
    await deleteAuthor(id);
    router.push('/authors');  // redirect to authors list after deletion
  };

  if (!author) return <p>Loading...</p>;

  return (
    <div>
      <Breadcrumb />
      <div className="flex items-center mb-4">
        {author.photo && (
          <img src={author.photo} alt={author.name} className="w-32 h-32 rounded-full mr-4" />
        )}
        <div>
          <h1 className="text-2xl font-bold">{author.name}</h1>
          <p className="text-gray-600">{author.bio}</p>
        </div>
      </div>

      {/* conditionally display books or message based on author */}
      {author.name !== 'Deleted author' ? (
        <>
          {author.books && author.books.length > 0 ? (
            <>
              <h2 className="text-xl font-bold mt-4">Books by this author:</h2>
              <ul>
                {author.books.map((book) => (
                  <li key={book.id} className="bg-gray-100 p-2 rounded mb-2">
                    <Link href={`/books/${book.id}`} className="text-blue-500 hover:underline">
                      {book.title} ({book.publicationYear})
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500 mt-4">No books available for this author.</p>
          )}
        </>
      ) : null}

      {/* display delete button only if it's not "Deleted author" */}
      {author.name !== 'Deleted author' && (
        <button
          onClick={() => setModalOpen(true)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Delete Author
        </button>
      )}

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this author? This action cannot be undone and their books will be reassigned to 'Deleted author'."
      />
    </div>
  );
}
