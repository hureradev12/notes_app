import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { JwtModule } from "@nestjs/jwt";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
        JwtModule.register({
            secret: `${process.env.JWT_SECRET}`,
            signOptions: { expiresIn: '7d' },
        })
    ],
    controllers: [UsersController],
    providers: [UsersService],
    exports: [JwtModule, MongooseModule],
})
export class UsersModule { }