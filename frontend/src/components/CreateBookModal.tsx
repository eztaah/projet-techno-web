import React, { useState } from 'react';
import ModalWrapper from './ModalWrapper';
import InputField from './InputField';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';

interface CreateBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (bookData: {
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
  const [title, setTitle] = useState('');
  const [publicationYear, setPublicationYear] = useState<number | ''>('');
  const [authorId, setAuthorId] = useState('');
  const [price, setPrice] = useState<number | ''>('');

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      publicationYear: Number(publicationYear),
      authorId,
      price: price ? Number(price) : undefined,
    });
    onClose();
    setTitle('');
    setPublicationYear('');
    setAuthorId('');
    setPrice('');
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <h2 className="text-xl font-bold mb-4">Add a New Book</h2>
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
        <InputField
          label="Author ID *"
          type="text"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
          required
        />
        <InputField
          label="Price (optional)"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
        />
        <div className="flex justify-end space-x-2">
          <ButtonSecondary onClick={onClose}>Cancel</ButtonSecondary>
          <ButtonPrimary type="submit">Add Book</ButtonPrimary>
        </div>
      </form>
    </ModalWrapper>
  );
}
