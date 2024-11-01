// ListCard.tsx
import React from 'react';
import Link from 'next/link';
import ButtonPrimary from './ButtonPrimary';
import ButtonSecondary from './ButtonSecondary';
import StarIcon from '@mui/icons-material/Star';

interface ListCardProps {
  title: string;
  subtitle?: string;
  description?: string;
  authorImage?: string;
  link: string;
  onEdit: () => void;
  onDelete: () => void;
  date?: string;
  averageRating?: number;
  authorName?: string;
  children?: React.ReactNode;
}

export default function ListCard({
  title,
  subtitle,
  description,
  authorImage,
  link,
  onEdit,
  onDelete,
  date,
  averageRating,
  authorName,
  children,
}: ListCardProps): JSX.Element {
  return (
    <div className="flex flex-col md:flex-row items-start bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-6 space-y-4 md:space-y-0 md:space-x-6">
      {/* Author Image */}
      {authorImage && (
        <img
          src={authorImage}
          alt={`${subtitle} author`}
          className="w-20 h-20 rounded-full object-cover shadow-md border-2 border-gray-200"
        />
      )}

      <div className="flex-1 space-y-2">
        <Link href={link} className="text-blue-600 hover:underline text-2xl font-semibold">
          {title}
        </Link>
        {authorName && <p className="text-sm text-gray-500 font-medium">by {authorName}</p>}
        {subtitle && <p className="text-sm text-gray-400 italic">{subtitle}</p>}
        {description && <p className="text-gray-700 mt-2 text-sm">{description}</p>}

        {/* Date and Rating */}
        <div className="flex items-center space-x-3 text-gray-500 text-sm mt-3">
          {date && (
            <p className="text-gray-400">
              Published on <span className="font-medium text-gray-600">{date}</span>
            </p>
          )}
          {averageRating !== undefined && (
            <div className="flex items-center">
              <StarIcon className="text-yellow-500 mr-1" />
              <p className="font-medium text-gray-600">{averageRating.toFixed(1)}</p>
            </div>
          )}
        </div>

        <div className="mt-4 text-gray-800">{children}</div>
      </div>

      <div className="flex flex-col space-y-2 items-end">
        {/* Edit and Delete Buttons */}
        <ButtonPrimary onClick={onEdit} className="px-4 py-2 text-sm font-medium shadow">
          Edit
        </ButtonPrimary>
        <ButtonSecondary onClick={onDelete} className="px-4 py-2 text-sm font-medium shadow bg-red-500 text-white hover:bg-red-600 transition duration-150">
          Delete
        </ButtonSecondary>
      </div>
    </div>
  );
}
