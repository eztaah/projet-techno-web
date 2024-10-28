import { useState } from 'react';

interface EditAuthorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (updatedData: { name: string; bio?: string; photo?: string }) => void;
  author: {
    name: string;
    bio?: string;
    photo?: string;
  };
}

export default function EditAuthorModal({
  isOpen,
  onClose,
  onSubmit,
  author,
}: EditAuthorModalProps) {
  const [name, setName] = useState(author.name);
  const [bio, setBio] = useState(author.bio || '');
  const [photo, setPhoto] = useState(author.photo || '');

  const handleSubmit = () => {
    onSubmit({ name, bio, photo });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-1/2">
        <h2 className="text-xl font-bold mb-4">Edit Author</h2>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Biography</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Photo URL</label>
          <input
            type="text"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
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
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
