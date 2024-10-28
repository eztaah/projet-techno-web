import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { AuthorEntity } from '../src/modules/author/author.entity';
import { BookEntity } from '../src/modules/book/book.entity';

async function clearDatabase(
  authorRepository: Repository<AuthorEntity>,
  bookRepository: Repository<BookEntity>
) {
  // clear books first, then authors to respect foreign key constraints
  await bookRepository.clear();
  await authorRepository.clear();
}

async function createDeletedAuthor(authorRepository: Repository<AuthorEntity>): Promise<AuthorEntity> {
  const existingDeletedAuthor = await authorRepository.findOne({ where: { name: 'Deleted author' } });
  if (existingDeletedAuthor) {
    return existingDeletedAuthor;
  }

  const deletedAuthor = authorRepository.create({
    id: 'deleted-author',
    name: 'Deleted author',
    bio: 'This author has been deleted.',
  });
  return await authorRepository.save(deletedAuthor);
}

async function populateAuthorsAndBooks(
  authorRepository: Repository<AuthorEntity>,
  bookRepository: Repository<BookEntity>,
  deletedAuthor: AuthorEntity
) {
  const authorsData = [
    { name: 'J.K. Rowling', bio: 'British author, best known for the Harry Potter series.', photo: 'https://hips.hearstapps.com/hmg-prod/images/gettyimages-1061157246.jpg' },
    { name: 'George Orwell', bio: 'British writer and journalist, famous for Animal Farm and 1984.', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/George_Orwell_press_photo.jpg/800px-George_Orwell_press_photo.jpg' },
    { name: 'Victor Hugo', bio: 'French poet, novelist, and dramatist, best known for Les Misérables.', photo: 'https://drop.philharmoniedeparis.fr/biographies/compositeurs/Hugo-Victor/Victor-Hugo-Etienne-Carjat-1876-%C2%A9BnF.jpg' },
    { name: 'Jane Austen', bio: 'English novelist known primarily for her six major novels.', photo: 'https://cdn.britannica.com/12/172012-050-DAA7CE6B/Jane-Austen-Cassandra-engraving-portrait-1810.jpg' },
    { name: 'Charles Dickens', bio: 'English writer and social critic, known for Oliver Twist and A Christmas Carol.', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Dickens_Gurney_head.jpg/800px-Dickens_Gurney_head.jpg' },
    { name: 'F. Scott Fitzgerald', bio: 'American novelist known for The Great Gatsby.', photo: 'https://cdn.britannica.com/47/24647-050-E6E25F22/F-Scott-Fitzgerald.jpg' },
    { name: 'Mark Twain', bio: 'American writer, humorist, and lecturer.', photo: null }, 
    { name: 'Ernest Hemingway', bio: 'American novelist, short-story writer, and journalist.', photo: null },
    { name: 'Leo Tolstoy', bio: 'Russian author known for War and Peace and Anna Karenina.', photo: 'https://cdn.britannica.com/94/4694-050-CABE0BB0/Leo-Tolstoy.jpg' },
    { name: 'Mary Shelley', bio: 'English novelist, best known for Frankenstein.', photo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Mary_Wollstonecraft_Shelley_Rothwell.tif/lossy-page1-1200px-Mary_Wollstonecraft_Shelley_Rothwell.tif.jpg' },
  ];

  const authors = [];
  for (const data of authorsData) {
    const author = authorRepository.create(data);
    authors.push(await authorRepository.save(author));
  }

  const booksData = [
    { title: 'Harry Potter and the Philosopher\'s Stone', publicationYear: 1997, author: authors[0] },
    { title: 'Harry Potter and the Chamber of Secrets', publicationYear: 1998, author: authors[0] },
    { title: '1984', publicationYear: 1949, author: authors[1] },
    { title: 'Animal Farm', publicationYear: 1945, author: authors[1] },
    { title: 'Les Misérables', publicationYear: 1862, author: authors[2] },
    { title: 'The Hunchback of Notre-Dame', publicationYear: 1831, author: authors[2] },
    { title: 'Pride and Prejudice', publicationYear: 1813, author: authors[3] },
    { title: 'Emma', publicationYear: 1815, author: authors[3] },
    { title: 'Oliver Twist', publicationYear: 1837, author: authors[4] },
    { title: 'A Christmas Carol', publicationYear: 1843, author: authors[4] },
    { title: 'Great Expectations', publicationYear: 1861, author: authors[4] },
    { title: 'The Great Gatsby', publicationYear: 1925, author: authors[5] },
    { title: 'The Adventures of Huckleberry Finn', publicationYear: 1884, author: authors[6] },
    { title: 'The Adventures of Tom Sawyer', publicationYear: 1876, author: authors[6] },
    { title: 'A Farewell to Arms', publicationYear: 1929, author: authors[7] },
    { title: 'The Old Man and the Sea', publicationYear: 1952, author: authors[7] },
    { title: 'War and Peace', publicationYear: 1869, author: authors[8] },
    { title: 'Anna Karenina', publicationYear: 1877, author: authors[8] },
    { title: 'Frankenstein', publicationYear: 1818, author: authors[9] },
    { title: 'Mathilda', publicationYear: 1820, author: authors[9] },
    { title: 'The Catcher in the Rye', publicationYear: 1951, author: deletedAuthor },
    { title: 'Brave New World', publicationYear: 1932, author: deletedAuthor },
    { title: 'To Kill a Mockingbird', publicationYear: 1960, author: deletedAuthor },
    { title: 'Moby-Dick', publicationYear: 1851, author: deletedAuthor },

  ];

  for (const data of booksData) {
    const book = bookRepository.create(data);
    await bookRepository.save(book);
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authorRepository = app.get('AuthorEntityRepository') as Repository<AuthorEntity>;
  const bookRepository = app.get('BookEntityRepository') as Repository<BookEntity>;

  // clear database then populate data
  await clearDatabase(authorRepository, bookRepository);
  const deletedAuthor = await createDeletedAuthor(authorRepository);
  await populateAuthorsAndBooks(authorRepository, bookRepository, deletedAuthor);

  console.log('Database populated successfully!');
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Error populating database:', error);
  process.exit(1);
});
