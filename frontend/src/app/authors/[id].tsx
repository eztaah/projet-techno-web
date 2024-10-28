'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchAuthorById } from '../../services/authorService';

export default function AuthorDetail() {
  const router = useRouter();
  const { id } = router.query;
  const [author, setAuthor] = useState(null);

  useEffect(() => {
    if (id) {
      fetchAuthorById(id).then(setAuthor);
    }
  }, [id]);

  if (!author) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{author.name}</h1>
      <p>{author.bio}</p>
    </div>
  );
}
