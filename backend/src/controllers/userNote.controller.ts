import { Controller, Post, Body, Param } from '@nestjs/common';
import { NotesService } from 'src/services/notes.service';
import { CreateNoteDto } from 'src/notes/notes.dto';

@Controller('users/:userId/notes')
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(
    @Param('userId') userId: number,
    @Body() createNoteDto: CreateNoteDto
  ): Promise<any> {
    const createdNote = await this.notesService.createNoteForUser(userId, createNoteDto);
    return createdNote;
  }
}
