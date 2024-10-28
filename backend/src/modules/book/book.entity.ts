import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { AuthorEntity } from '../author/author.entity';

@Entity('books')
export class BookEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'int' })
  publicationYear: number;

  @ManyToOne(() => AuthorEntity, (author) => author.books, { eager: true })
  author: AuthorEntity;
}
