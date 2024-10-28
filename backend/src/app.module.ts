import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { BookModule } from './modules/book/book.module';
import { AuthorModule } from './modules/author/author.module';

@Module({
  imports: [DatabaseModule, BookModule, AuthorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
