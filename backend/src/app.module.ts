import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NotesController } from './controllers/notes.controller';
import { NotesService } from './services/notes.service';
import { Note } from './notes/note.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/user.entity.';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'postgres',
      entities: [Note, User], 
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Note, User]), 
    UsersModule,
  ],
  controllers: [AppController, NotesController],
  providers: [AppService, NotesService],
})
export class AppModule {}
