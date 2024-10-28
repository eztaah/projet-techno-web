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

  @OneToMany(() => BookEntity, (book) => book.author)
  books: BookEntity[];

  @BeforeInsert()
  setId() {
    // Génère un ID sous la forme "prenom-nom", en remplaçant les espaces par des tirets et en mettant en minuscules
    this.id = `${this.name.toLowerCase().replace(/\s+/g, '-')}`;
  }
}
