import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Note } from 'src/notes/note.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number ;

  @Column()
  email: string  | null; 

  @Column()
  password: string  | null;

  @OneToMany(type => Note, note => note.user) 
  notes: Note[];
}
