import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { NotesService } from '../services/notes.service';
import { CreateNoteDto } from '../notes/notes.dto';
import { Note } from '../notes/note.entity';

@Controller('notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Get()
  async findAll(@Query('archived') archived?: boolean): Promise<Note[]> {
    return this.notesService.findAll(archived);
  }

  @Get(':id')
  async findById(@Param('id') id: number): Promise<Note | undefined> {
    return this.notesService.findById(id);
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: string): Promise<Note[]> {
    return this.notesService.findByCategory(category);
  }

  @Post()
  async create(@Body() createNoteDto: CreateNoteDto): Promise<Note> {
    const createdNote = await this.notesService.create(createNoteDto);
    return createdNote;
  }

  @Delete(':id')
  async deleteById(@Param('id') id: number): Promise<void> {
    return this.notesService.deleteById(id);
  }
  
  @Put(':id')
  async editById(@Param('id') id: number, @Body() updateNoteDto: CreateNoteDto): Promise<Note> {
    return this.notesService.editById(id, updateNoteDto);
  }
}
