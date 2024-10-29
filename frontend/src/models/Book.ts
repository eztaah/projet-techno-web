export interface Book {
  id: string;
  title: string;
  publicationYear: number;
  price?: number;
  author: {
    id: string;
    name: string;
  };
}
