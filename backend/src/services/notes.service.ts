import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from '../notes/note.entity';
import { CreateNoteDto } from '../notes/notes.dto';
import { FindManyOptions } from 'typeorm';
import { User } from 'src/users/user.entity.';

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private notesRepository: Repository<Note>,
    @InjectRepository(User) 
    private userRepository: Repository<User>, 
  ) {}

  async create(createNoteDto: CreateNoteDto): Promise<Note> {
    const note = this.notesRepository.create(createNoteDto);
    return this.notesRepository.save(note);
  }

  async findById(id: number): Promise<Note | undefined> {
    return this.notesRepository.findOne({ where: { id } });
  }

  async findByCategory(category: string): Promise<Note[]> {
    return this.notesRepository.createQueryBuilder('note')
        .where('LOWER(note.category) = :category', { category: category.toLowerCase() })
        .getMany();
  }
  
  async deleteById(id: number): Promise<void> {

    const result = await this.notesRepository.delete(id);
  
    if (result.affected === 0) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }
  }

  async createNoteForUser(userId: number, createNoteDto: CreateNoteDto): Promise<Note> {
    const { title, category, archived } = createNoteDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newNote = new Note();
    newNote.title = title;
    newNote.category = category;
    newNote.archived = archived;
    newNote.user = user; 


    return this.notesRepository.save(newNote);
  }
  
  async editById(id: number, updateNoteDto: CreateNoteDto): Promise<Note> {
    const note = await this.notesRepository.findOne({ where: { id } });

    if (!note) {
      throw new NotFoundException(`Note with ID ${id} not found`);
    }

    const updatedNote = Object.assign(note, updateNoteDto);

    return this.notesRepository.save(updatedNote);
  }

  async findAll(archived?: boolean): Promise<Note[]> {
    const queryOptions: FindManyOptions<Note> = {};

    if (archived !== undefined) {
      queryOptions.where = { archived };
    }

    return this.notesRepository.find(queryOptions);
  }
}
