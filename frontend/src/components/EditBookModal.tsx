// EditBookModal.tsx
import React, { useState, useEffect } from 'react';
import ModalWrapper from './ModalWrapper';
import InputField from './InputField';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import { Author } from '../models';

interface EditBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  authors: Author[];
  bookData: {
    id: string;
    title: string;
    publicationYear: number;
    authorId: string;
    price?: number;
  };
  onSubmit: (bookId: string, updatedData: {
    title: string;
    publicationYear: number;
    authorId: string;
    price?: number;
  }) => void;
}

export default function EditBookModal({
  isOpen,
  onClose,
  authors = [],
  bookData,
  onSubmit,
}: EditBookModalProps): JSX.Element | null {
  const [title, setTitle] = useState('');
  const [publicationYear, setPublicationYear] = useState<number | ''>(''); 
  const [authorId, setAuthorId] = useState(''); 
  const [price, setPrice] = useState<number | ''>('');

  // Met à jour les champs avec les données du livre quand le modal s'ouvre
  useEffect(() => {
    if (isOpen) {
      setTitle(bookData.title || '');
      setPublicationYear(bookData.publicationYear || '');
      setAuthorId(bookData.authorId || ''); // Initialise avec l'auteur du livre
      setPrice(bookData.price ?? '');
    }
  }, [bookData, isOpen]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(bookData.id, {
      title,
      publicationYear: Number(publicationYear),
      authorId,
      price: price ? Number(price) : undefined,
    });
    onClose();
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Book</h2>
      <form onSubmit={handleFormSubmit}>
        <InputField
          label="Title *"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <InputField
          label="Publication Year *"
          type="number"
          value={publicationYear}
          onChange={(e) => setPublicationYear(e.target.value ? Number(e.target.value) : '')}
          required
        />
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-1">Author *</label>
<select
  value={authorId} // ID de l'auteur par défaut
  onChange={(e) => setAuthorId(e.target.value)}
  required
  className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
>
  
  {authors.map((author) => (
    <option key={author.id} value={author.id}>
      {author.name}
    </option>
  ))}
</select>

        </div>
        <InputField
          label="Price (optional)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
        />
        <div className="flex justify-end space-x-2">
          <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
          <ButtonPrimary type="submit">Save Changes</ButtonPrimary>
        </div>
      </form>
    </ModalWrapper>
  );
}
