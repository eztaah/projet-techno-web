// frontend/src/app/books/[id]/page.tsx

'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { fetchBookById, deleteBook } from '../../../services/bookService';
import { fetchReviews, createReview } from '../../../services/reviewService'; // New services
import Breadcrumb from '../../../components/Breadcrumb';
import Link from 'next/link';
import DeleteConfirmationModal from '../../../components/DeleteConfirmationModal';
import { Drawer, Button, IconButton } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import CloseIcon from '@mui/icons-material/Close';
import ReviewForm from '../../../components/ReviewForm'; // New component

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

interface Review {
  id: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export default function BookDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isModalOpen, setModalOpen] = useState(false);
  const [sortOrder, setSortOrder] = useState<'ASC' | 'DESC'>('ASC'); // Sorting order

  useEffect(() => {
    if (id) {
      fetchBookById(id).then(setBook).catch(console.error);
      loadReviews();
    }
  }, [id, sortOrder]);

  const loadReviews = async () => {
    const fetchedReviews = await fetchReviews(id, sortOrder);
    setReviews(fetchedReviews);
  };

  const handleDelete = async () => {
    await deleteBook(id);
    router.push('/books');
  };

  const toggleDrawer = () => setDrawerOpen(!isDrawerOpen);

  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg mb-2">Price: ${book.price}</p>
      <p className="text-lg mb-2">Publication Year: {book.publicationYear}</p>
      <p className="text-lg">
        Author:{' '}
        <Link
          href={`/authors/${book.author.id}`}
          className="text-blue-500 hover:underline"
        >
          {book.author.name}
        </Link>
      </p>

      <button
        onClick={() => setModalOpen(true)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
      >
        Delete Book
      </button>

      <Button
        onClick={toggleDrawer}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        View Reviews
      </Button>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer}>
        <div className="p-4 w-80">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Reviews</h2>
            <IconButton onClick={toggleDrawer}>
              <CloseIcon />
            </IconButton>
          </div>
          <Button
            onClick={() => setSortOrder(sortOrder === 'ASC' ? 'DESC' : 'ASC')}
            className="mb-4 bg-gray-200"
          >
            Sort by Date {sortOrder === 'ASC' ? '↓' : '↑'}
          </Button>

          <ul>
            {reviews.map((review) => (
              <li
                key={review.id}
                className="bg-gray-100 p-2 mb-2 rounded shadow"
              >
                <div className="flex items-center">
                  {[...Array(review.rating)].map((_, index) => (
                    <StarIcon key={index} className="text-yellow-500" />
                  ))}
                  <p className="ml-2 text-gray-500 text-sm">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {review.comment && <p className="mt-2">{review.comment}</p>}
              </li>
            ))}
          </ul>

          <ReviewForm bookId={book.id} onReviewSubmit={loadReviews} />
        </div>
      </Drawer>

      <DeleteConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this book? This action cannot be undone."
      />
    </div>
  );
}
