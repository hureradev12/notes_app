import { Body, Controller, Delete, Get, Param, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { JwtAuthGuard } from "../users/guard/jwt-auth.guard";
import { UpdateNoteDto } from "./dto/update-note.dto";



@Controller('api/v1/notes')
@UseGuards(JwtAuthGuard)
export class NotesController {
    constructor(
        private readonly service: NotesService
    ) { }

    @Post('create')
    async createNote(@Body() dto: CreateNoteDto, @Req() req) {
        const userId = req.user._id;
        console.log(userId, "sdjsdhgj");

        return this.service.createNote(dto, userId);
    }

    @Get('my-notes')
    async getUserNotes(@Req() req) {
        const userId = req.user._id;
        return this.service.getUserNotes(userId);
    }

    @Get(':id')
    async getNoteById(@Req() req) {
        const userId = req.user._id;
        const noteId = req.params.id;
        return this.service.getNoteById(noteId, userId);
    }

    @Patch(':id')
    async updateNote(@Body() dto: UpdateNoteDto, @Req() req) {
        const userId = req.user._id;
        const noteId = req.params.id;
        return this.service.updateNote(noteId, dto, userId);
    }

    @Delete(':id')
    async deleteNote(@Req() req) {
        const userId = req.user._id;
        const noteId = req.params.id;
        return this.service.deleteNote(noteId, userId);
    }
}