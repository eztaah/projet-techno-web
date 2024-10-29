import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { Repository } from 'typeorm';
import { AuthorEntity } from '../src/modules/author/author.entity';
import { BookEntity } from '../src/modules/book/book.entity';
import { ReviewEntity } from '../src/modules/review/review.entity';

async function clearDatabase(
  authorRepository: Repository<AuthorEntity>,
  bookRepository: Repository<BookEntity>,
  reviewRepository: Repository<ReviewEntity>
) {
  // clear reviews, then books, then authors to respect foreign key constraints
  await reviewRepository.clear();
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

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomPrice(): number {
  return parseFloat((Math.random() * (29.99 - 5.99) + 5.99).toFixed(2));
}

function getRandomComment(): string {
  const comments = [
    "Excellent book!",
    "Very insightful and thought-provoking.",
    "Enjoyed reading this.",
    "Could be better.",
    "Not my type of book.",
    "Amazing storytelling!",
    "Didn't like it much.",
    "A true classic!",
    "Highly recommend!",
    "Just okay."
  ];
  return comments[getRandomInt(0, comments.length - 1)];
}

async function populateAuthorsAndBooks(
  authorRepository: Repository<AuthorEntity>,
  bookRepository: Repository<BookEntity>,
  deletedAuthor: AuthorEntity
): Promise<BookEntity[]> {
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
    { title: 'Harry Potter and the Philosopher\'s Stone', publicationYear: 1997, author: authors[0], price: getRandomPrice() },
    { title: 'Harry Potter and the Chamber of Secrets', publicationYear: 1998, author: authors[0], price: getRandomPrice() },
    { title: '1984', publicationYear: 1949, author: authors[1], price: getRandomPrice() },
    { title: 'Animal Farm', publicationYear: 1945, author: authors[1], price: getRandomPrice() },
    { title: 'Les Misérables', publicationYear: 1862, author: authors[2], price: getRandomPrice() },
    { title: 'The Hunchback of Notre-Dame', publicationYear: 1831, author: authors[2], price: getRandomPrice() },
    { title: 'Pride and Prejudice', publicationYear: 1813, author: authors[3], price: getRandomPrice() },
    { title: 'Emma', publicationYear: 1815, author: authors[3], price: getRandomPrice() },
    { title: 'Oliver Twist', publicationYear: 1837, author: authors[4], price: getRandomPrice() },
    { title: 'A Christmas Carol', publicationYear: 1843, author: authors[4], price: getRandomPrice() },
    { title: 'Great Expectations', publicationYear: 1861, author: authors[4], price: getRandomPrice() },
    { title: 'The Great Gatsby', publicationYear: 1925, author: authors[5], price: getRandomPrice() },
    { title: 'The Adventures of Huckleberry Finn', publicationYear: 1884, author: authors[6], price: getRandomPrice() },
    { title: 'The Adventures of Tom Sawyer', publicationYear: 1876, author: authors[6], price: getRandomPrice() },
    { title: 'A Farewell to Arms', publicationYear: 1929, author: authors[7], price: getRandomPrice() },
    { title: 'The Old Man and the Sea', publicationYear: 1952, author: authors[7], price: getRandomPrice() },
    { title: 'War and Peace', publicationYear: 1869, author: authors[8], price: getRandomPrice() },
    { title: 'Anna Karenina', publicationYear: 1877, author: authors[8], price: getRandomPrice() },
    { title: 'Frankenstein', publicationYear: 1818, author: authors[9], price: getRandomPrice() },
    { title: 'Mathilda', publicationYear: 1820, author: authors[9], price: getRandomPrice() },
    { title: 'The Catcher in the Rye', publicationYear: 1951, author: deletedAuthor, price: getRandomPrice() },
    { title: 'Brave New World', publicationYear: 1932, author: deletedAuthor, price: getRandomPrice() },
    { title: 'To Kill a Mockingbird', publicationYear: 1960, author: deletedAuthor, price: getRandomPrice() },
    { title: 'Moby-Dick', publicationYear: 1851, author: deletedAuthor, price: getRandomPrice() },
  ];

  const books = [];
  for (const data of booksData) {
    const book = bookRepository.create(data);
    books.push(await bookRepository.save(book));
  }

  return books;
}

async function populateReviews(
  books: BookEntity[],
  reviewRepository: Repository<ReviewEntity>
) {
  for (const book of books) {
    const reviewCount = getRandomInt(0, 10);
    for (let i = 0; i < reviewCount; i++) {
      const review = reviewRepository.create({
        rating: getRandomInt(1, 5),
        comment: getRandomComment(),
        book,
      });
      await reviewRepository.save(review);
    }
  }
}

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const authorRepository = app.get('AuthorEntityRepository') as Repository<AuthorEntity>;
  const bookRepository = app.get('BookEntityRepository') as Repository<BookEntity>;
  const reviewRepository = app.get('ReviewEntityRepository') as Repository<ReviewEntity>;

  // clear database then populate data
  await clearDatabase(authorRepository, bookRepository, reviewRepository);
  const deletedAuthor = await createDeletedAuthor(authorRepository);
  const books = await populateAuthorsAndBooks(authorRepository, bookRepository, deletedAuthor);
  await populateReviews(books, reviewRepository);

  console.log('Database populated successfully!');
  await app.close();
}

bootstrap().catch((error) => {
  console.error('Error populating database:', error);
  process.exit(1);
});
