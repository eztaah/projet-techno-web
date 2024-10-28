'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  fetchAuthorById,
  updateAuthor,
  deleteAuthor,
} from '../../../services/authorService';
import { createBook, deleteBook } from '../../../services/bookService';
import Breadcrumb from '../../../components/Breadcrumb';
import EditAuthorModal from '../../../components/EditAuthorModal';
import CreateBookModal from '../../../components/CreateBookModal';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  publicationYear: number;
}

interface Author {
  id: string;
  name: string;
  bio?: string;
  photo?: string;
  books?: Book[];
}

export default function AuthorDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [author, setAuthor] = useState<Author | null>(null);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [isBookModalOpen, setBookModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchAuthorById(id).then(setAuthor).catch(console.error);
    }
  }, [id]);

  const handleUpdateAuthor = async (updatedData) => {
    if (!author) return;
    await updateAuthor(author.id, updatedData);
    fetchAuthorById(author.id).then(setAuthor); // reload author data
  };

  const handleAddBook = async (newBook) => {
    if (!author) return;
    await createBook({ ...newBook, authorId: author.id });
    fetchAuthorById(author.id).then(setAuthor); // reload author data to show new book
  };

  const handleDeleteBook = async (bookId: string) => {
    await deleteBook(bookId);
    fetchAuthorById(id).then(setAuthor); // reload author data to remove deleted book
  };

  const handleDeleteAuthor = async () => {
    await deleteAuthor(id);
    router.push('/authors'); // redirect to authors list after deletion
  };

  if (!author) return <p>Loading...</p>;

  return (
    <div>
      <Breadcrumb />
      <div className="flex items-center mb-4">
        {author.photo && (
          <img
            src={author.photo}
            alt={author.name}
            className="w-32 h-32 rounded-full mr-4"
          />
        )}
        <div>
          <h1 className="text-2xl font-bold">{author.name}</h1>
          <p className="text-gray-600">{author.bio}</p>

          {/* Conditionally display edit and delete buttons only if it's not "Deleted author" */}
          {author.name !== 'Deleted author' && (
            <>
              <button
                onClick={() => setEditModalOpen(true)}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Edit Author
              </button>
              <button
                onClick={() => setDeleteModalOpen(true)}
                className="mt-4 ml-2 px-4 py-2 bg-red-500 text-white rounded"
              >
                Delete Author
              </button>
            </>
          )}
        </div>
      </div>

      {/* Conditionally display books or message based on whether the author is "Deleted author" */}
      {author.name !== 'Deleted author' ? (
        <>
          {/* Check if books array exists and has elements */}
          {author.books && author.books.length > 0 ? (
            <>
              <h2 className="text-xl font-bold mt-4">Books by this author:</h2>
              <ul>
                {author.books.map((book) => (
                  <li
                    key={book.id}
                    className="bg-gray-100 p-2 rounded mb-2 flex justify-between items-center"
                  >
                    <Link
                      href={`/books/${book.id}`}
                      className="text-blue-500 hover:underline"
                    >
                      {book.title} ({book.publicationYear})
                    </Link>
                    <button
                      onClick={() => handleDeleteBook(book.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <p className="text-gray-500 mt-4">
              No books available for this author.
            </p>
          )}

          {/* Button to add a new book, only shown if author is not "Deleted author" */}
          <button
            onClick={() => setBookModalOpen(true)}
            className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
          >
            Add New Book
          </button>
        </>
      ) : (
        <p className="text-gray-500 mt-4">
          This author has been deleted and their books are reassigned.
        </p>
      )}

      {/* Modals for editing author, adding book, and confirming author deletion */}
      {author.name !== 'Deleted author' && (
        <>
          <EditAuthorModal
            isOpen={isEditModalOpen}
            onClose={() => setEditModalOpen(false)}
            onSubmit={handleUpdateAuthor}
            author={author}
          />

          <CreateBookModal
            isOpen={isBookModalOpen}
            onClose={() => setBookModalOpen(false)}
            onSubmit={handleAddBook}
          />
        </>
      )}

      <DeleteConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteAuthor}
        message="Are you sure you want to delete this author? This action cannot be undone and their books will be reassigned to 'Deleted author'."
      />
    </div>
  );
}
