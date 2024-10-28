import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  BeforeInsert,
} from 'typeorm';
import { AuthorEntity } from '../author/author.entity';

@Entity('books')
export class BookEntity {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  title: string;

  @Column({ type: 'int' })
  publicationYear: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  price: number;

  @ManyToOne(() => AuthorEntity, (author) => author.books, { eager: true })
  author: AuthorEntity;

  @BeforeInsert()
  setId() {
    this.id = `${this.title.toLowerCase().replace(/\s+/g, '-')}-by-${this.author.id.toLowerCase().replace(/\s+/g, '-')}`;
  }
}
