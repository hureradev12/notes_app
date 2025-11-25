import { Body, Controller, Post } from "@nestjs/common";
import { UsersService } from "./users.service";
import { SignUpUserDto } from "./dto/sign-up-user.dto";
import { SignInUserDto } from "./dto/sign-in-user.dto";



@Controller('api/v1/user')
export class UsersController {
    constructor(private readonly service: UsersService) { }

    @Post('signup')
    async signUp(@Body() dto: SignUpUserDto) {
        return this.service.signUp(dto);
    }

    @Post('signin')
    async signIn(@Body() dto: SignInUserDto) {
        return this.service.signIn(dto);
    }
}