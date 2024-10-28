'use client';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
      <h1 className="text-4xl font-bold mb-4">Welcome to the Library Management System</h1>
      <p className="text-lg text-gray-700 mb-8">
        Manage your books and authors with ease.
      </p>
      <div className="flex space-x-4">
        <Link href="/books" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
          View Books
        </Link>
        <Link href="/authors" className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          View Authors
        </Link>
      </div>
    </div>
  );
}
