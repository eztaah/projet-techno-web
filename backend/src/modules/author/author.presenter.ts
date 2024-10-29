import { AuthorEntity } from './author.entity';

export class AuthorPresenter {
  constructor(
    public id: string,
    public name: string,
    public bio?: string,
    public photo?: string,
    public bookCount?: number,
    public books?: { id: string; title: string; publicationYear: number }[]
  ) {}

  static fromEntity(author: AuthorEntity): AuthorPresenter {
    return new AuthorPresenter(
      author.id,
      author.name,
      author.bio,
      author.photo,
      author.books ? author.books.length : undefined,
      author.books
        ? author.books.map((book) => ({
            id: book.id,
            title: book.title,
            publicationYear: book.publicationYear,
          }))
        : undefined
    );
  }
}
