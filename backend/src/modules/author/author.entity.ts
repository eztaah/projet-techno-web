import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookEntity } from '../book/book.entity';

@Entity('authors')
export class AuthorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];
}
