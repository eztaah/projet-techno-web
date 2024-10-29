'use client';
import Link from 'next/link';
import Button from './Button';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Button
            onClick={() => (window.location.href = '/')}
            className="text-white"
          >
            Home
          </Button>
        </li>
        <li>
          <Button
            onClick={() => (window.location.href = '/books')}
            className="text-white"
          >
            Books
          </Button>
        </li>
        <li>
          <Button
            onClick={() => (window.location.href = '/authors')}
            className="text-white"
          >
            Authors
          </Button>
        </li>
      </ul>
    </nav>
  );
}
