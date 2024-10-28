import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link href="/" className="text-white">Home</Link>
        </li>
        <li>
          <Link href="/books" className="text-white">Books</Link>
        </li>
        <li>
          <Link href="/authors" className="text-white">Authors</Link>
        </li>
      </ul>
    </nav>
  );
}
