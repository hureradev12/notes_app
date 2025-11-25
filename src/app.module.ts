import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './modules/users/users.module';
import { NotesModule } from './modules/notes/notes.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration] }),
    MongooseModule.forRoot(process.env.MONGO_URI!, {
      dbName: 'notes_app',
    }),
    UsersModule,
    NotesModule,
  ],
})
export class AppModule { }
