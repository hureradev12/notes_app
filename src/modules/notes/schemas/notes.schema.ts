import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type NoteDocument = HydratedDocument<Note>;

@Schema({ timestamps: true })
export class Note {

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    user: Types.ObjectId;

    @Prop({ required: true })
    title: string;

    @Prop({ required: true })
    description: string;

}

export const NoteSchema = SchemaFactory.createForClass(Note);