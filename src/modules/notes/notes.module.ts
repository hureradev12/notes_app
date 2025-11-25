import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { NotesController } from "./notes.controller";
import { MongooseModule } from "@nestjs/mongoose";
import { Note, NoteSchema } from "./schemas/notes.schema";
import { User, UserSchema } from "../users/schemas/user.schema";
import { UsersModule } from "../users/users.module";




@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Note.name, schema: NoteSchema },
            { name: User.name, schema: UserSchema }
        ]),
        UsersModule,
    ],
    controllers: [NotesController],
    providers: [NotesService],
})
export class NotesModule { }