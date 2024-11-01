// BookList.tsx
'use client';
import { useState } from 'react';
import { useBookProvider } from '../../providers/useBookProvider';
import { useAuthorProvider } from '../../providers/useAuthorProvider';
import ButtonPrimary from '../../components/ButtonPrimary';
import Breadcrumb from '../../components/Breadcrumb';
import CreateBookModal from '../../components/CreateBookModal';
import EditBookModal from '../../components/EditBookModal';
import ListCard from '../../components/ListCard';
import DeleteConfirmation from '../../components/DeleteConfirmationModal';
import StarIcon from '@mui/icons-material/Star';

type SortOption = 'title-asc' | 'title-desc' | 'price-asc' | 'price-desc' | 'rating-asc' | 'rating-desc' | 'date-added';

export default function BookList(): JSX.Element {
  const { books, addBook, removeBook, editBook } = useBookProvider();
  const { authors } = useAuthorProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('title-asc');
  const [bookToEdit, setBookToEdit] = useState(null);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [error, setError] = useState<string | null>(null);

  const handleCreateBook = async (bookData) => {
    try {
      await addBook(bookData);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating book:", error);
      setError("Failed to create book. Please try again.");
    }
  };

  const handleEditBook = async (bookId, updatedData) => {
    try {
      await editBook(bookId, updatedData);
      setBookToEdit(null);
    } catch (error) {
      console.error("Error editing book:", error);
      setError("Failed to edit book. Please try again.");
    }
  };

  const confirmDeleteBook = async () => {
    if (!bookToDelete) return;
    try {
      await removeBook(bookToDelete);
      setBookToDelete(null);
    } catch (error) {
      console.error("Error deleting book:", error);
      setError("Failed to delete the book and its reviews. Please try again.");
    }
  };

  const sortedBooks = [...books]
    .filter((book) => book.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => {
      switch (sortOption) {
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        case 'price-asc': return (a.price ?? 0) - (b.price ?? 0);
        case 'price-desc': return (b.price ?? 0) - (a.price ?? 0);
        case 'rating-asc': return (a.averageRating ?? 0) - (b.averageRating ?? 0);
        case 'rating-desc': return (b.averageRating ?? 0) - (a.averageRating ?? 0);
        case 'date-added': return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        default: return 0;
      }
    });

  return (
    <div>
      <Breadcrumb />
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <input
        type="text"
        placeholder="Search by title..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      <div className="flex items-center space-x-4 mb-4">
        <ButtonPrimary onClick={() => setIsModalOpen(true)}>Add New Book</ButtonPrimary>
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value as SortOption)}
          className="p-2 border rounded"
        >
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="price-asc">Price (Low to High)</option>
          <option value="price-desc">Price (High to Low)</option>
          <option value="rating-asc">Rating (Low to High)</option>
          <option value="rating-desc">Rating (High to Low)</option>
          <option value="date-added">Date Added (Newest First)</option>
        </select>
      </div>

      {sortedBooks.map((book) => (
        <ListCard
          key={book.id}
          title={book.title}
          subtitle={`Author: ${book.author.name}`}
          description={`Published in ${book.publicationYear} - Price: $${book.price?.toFixed(2) ?? 'N/A'}`}
          authorImage={book.author.photo}
          link={`/books/${book.id}`}
          onEdit={() => setBookToEdit(book)}
          onDelete={() => {
            setBookToDelete(book.id);
            setError(null);
          }}
        >
          {book.averageRating !== undefined && book.averageRating !== null ? (
            <div className="flex items-center">
              <p className="text-gray-600 mr-2">Average Rating:</p>
              <div className="flex items-center">
                {[...Array(Math.round(book.averageRating))].map((_, i) => (
                  <StarIcon key={i} className="text-yellow-500" />
                ))}
                <p className="ml-1">({book.averageRating.toFixed(1)})</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No reviews yet</p>
          )}
        </ListCard>
      ))}

      <CreateBookModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateBook}
        authors={authors}
      />

      {bookToDelete && (
        <DeleteConfirmation
          isOpen={!!bookToDelete}
          onClose={() => setBookToDelete(null)}
          onConfirm={confirmDeleteBook}
          message="Are you sure you want to delete this book and all its reviews?"
        />
      )}

      {bookToEdit && (
        <EditBookModal
          isOpen={!!bookToEdit}
          onClose={() => setBookToEdit(null)}
          bookData={bookToEdit}
          onSubmit={handleEditBook}
          authors={authors}
        />
      )}
    </div>
  );
}
