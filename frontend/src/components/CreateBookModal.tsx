import { useState, useEffect } from 'react';

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (book: {
    title: string;
    publicationYear: number;
    authorId: string;
    price?: number;
  }) => void;
}

export default function CreateBookModal({
  isOpen,
  onClose,
  onSubmit,
}: CreateBookModalProps): JSX.Element | null {
  const [title, setTitle] = useState<string>('');
  const [publicationYear, setPublicationYear] = useState<string>('');
  const [authorId, setAuthorId] = useState<string>('');
  const [price, setPrice] = useState<string>('');

  useEffect(() => {
    if (isOpen) {
      setTitle('');
      setPublicationYear('');
      setAuthorId('');
      setPrice('');
    }
  }, [isOpen]);

  const handleSubmit = (): void => {
    const publicationYearNumber = parseInt(publicationYear, 10);
    const priceNumber = parseFloat(price);

    if (!title || !publicationYearNumber || !authorId) {
      alert('Please fill in all required fields.');
      return;
    }

    onSubmit({
      title,
      publicationYear: publicationYearNumber,
      authorId,
      price: price ? priceNumber : undefined,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Add New Book</h2>

        <div className="mb-4">
          <label className="block text-gray-700">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Harry Potter and the Philosopher's Stone"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Publication Year <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            value={publicationYear}
            onChange={(e) => setPublicationYear(e.target.value)}
            placeholder="e.g., 1997"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Author ID <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            placeholder="Author's unique ID"
            required
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">
            Price <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="e.g., 19.99"
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 mr-2 bg-gray-500 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Book
          </button>
        </div>
      </div>
    </div>
  );
}
