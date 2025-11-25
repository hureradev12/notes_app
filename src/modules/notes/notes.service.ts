import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Note, NoteDocument } from "./schemas/notes.schema";
import { CreateNoteDto } from "./dto/create-note.dto";
import { ApiResponse } from "src/utils/ApiResponse";
import { UpdateNoteDto } from "./dto/update-note.dto";


@Injectable()
export class NotesService {
    constructor(
        @InjectModel(Note.name) private noteModel: Model<NoteDocument>,
    ) { }

    async createNote(dto: CreateNoteDto, userId: string) {
        const { title, description } = dto;

        const note = await this.noteModel.create({
            title,
            description,
            user: userId,
        });

        return new ApiResponse(201, note, 'Note created successfully');
    }

    async getUserNotes(userId: string) {
        const notes = await this.noteModel.find({ user: userId }).sort({ createdAt: -1 });
        return new ApiResponse(200, notes, 'User notes fetched successfully');
    }

    async getNoteById(noteId: string, userId: string) {
        const note = await this.noteModel.findOne({ _id: noteId, user: userId });
        return new ApiResponse(200, note, 'Note fetched successfully');
    }

    async updateNote(noteId: string, dto: UpdateNoteDto, userId: string) {
        const { title, description } = dto;
        const note = await this.noteModel.findOneAndUpdate(
            { _id: noteId, user: userId },
            { title, description },
            { new: true }
        );
        return new ApiResponse(200, note, 'Note updated successfully');
    }

    async deleteNote(noteId: string, userId: string) {
        await this.noteModel.findOneAndDelete({ _id: noteId, user: userId });
        return new ApiResponse(200, null, 'Note deleted successfully');
    }
}