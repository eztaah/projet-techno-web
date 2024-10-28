'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchBookById, deleteBook } from '../../../services/bookService';
import Breadcrumb from '../../../components/Breadcrumb';
import Link from 'next/link';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';

interface Author {
  id: string;
  name: string;
}

interface Book {
  id: string;
  title: string;
  price: number;
  publicationYear: number;
  author: Author;
}

export default function BookDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (id) {
      fetchBookById(id).then(setBook).catch(console.error);
    }
  }, [id]);

  const handleDelete = async () => {
    await deleteBook(id);
    router.push('/books');
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg mb-2">Price: ${book.price}</p>
      <p className="text-lg mb-2">Publication Year: {book.publicationYear}</p>
      <p className="text-lg">
        Author: <Link href={`/authors/${book.author.id}`} className="text-blue-500 hover:underline">
          {book.author.name}
        </Link>
      </p>
      
      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Delete Book
      </button>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this book? This action cannot be undone."
      />
    </div>
  );
}
