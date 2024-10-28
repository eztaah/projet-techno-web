import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  BeforeInsert,
} from 'typeorm';
import { BookEntity } from '../book/book.entity';

@Entity('authors')
export class AuthorEntity {
  @PrimaryColumn({ type: 'text' })
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'text', nullable: true })
  photo: string;

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];

  @BeforeInsert()
  setId() {
    this.id = `${this.name.toLowerCase().replace(/\s+/g, '-')}`;
  }
}
