import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/user.schema";
import { Model } from "mongoose";
import { SignUpUserDto } from "./dto/sign-up-user.dto";
import * as bcrypt from 'bcryptjs';
import { ApiResponse } from "src/utils/ApiResponse";
import { SignInUserDto } from "./dto/sign-in-user.dto";
import jwt from "jsonwebtoken"
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
    ) { }

    async signUp(dto: SignUpUserDto) {
        try {
            const { username, email, password } = dto;

            const existedUser = await this.userModel.findOne({
                $or: [{ username }, { email }]
            })
            if (existedUser) {
                throw new ConflictException("User with this email or username already exists");
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const user = await this.userModel.create({
                username,
                email,
                password: hashedPassword,
            });

            const createdUser = await this.userModel.findById(user._id).select('-password');

            if (!createdUser) {
                throw new ConflictException("User creation failed");
            }
            return new ApiResponse(201, createdUser, 'User registered successfully');
        } catch (err) {
            if (err.code === 11000) {
                throw new ConflictException('Email already exists');
            }
            throw err;
        }
    }


    async signIn(dto: SignInUserDto) {
        const { email, password } = dto;

        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new ConflictException("Invalid email");
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ConflictException("Invalid password");
        }

        // Create JWT token
        const token = this.jwtService.sign({
            userId: user._id,
            email: user.email,
        });

        const userWithoutPassword = user.toObject();
        delete (userWithoutPassword as { password?: string }).password;

        return new ApiResponse(200, { token, user: userWithoutPassword }, "Login successful");
    }
}