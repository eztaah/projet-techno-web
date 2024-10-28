import Link from 'next/link';

interface BreadcrumbProps {
  paths: { label: string; href?: string }[];
}

export default function Breadcrumb({ paths }: BreadcrumbProps) {
  return (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb flex space-x-2 text-gray-500">
        {paths.map((path, index) => (
          <li key={index}>
            {path.href ? <Link href={path.href} className="hover:underline">{path.label}</Link> : path.label}
            {index < paths.length - 1 && <span className="mx-2">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
