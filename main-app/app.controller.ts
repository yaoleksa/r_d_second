import { Controller } from "../common/controller/Controller.js";
import { Get, Post, Put, Patch, Delete } from "../common/http-layers/HttpLayers.js";
import { UserService } from "./app.service.js";
import { ApiKeyGuard } from "./guards/guards.js";
import { ParamTypeCheck, EmailCheck, ZodValidationPipe, creatueUserSchema } from "./pipes/pipes.js";
import { User } from "./dto/userDTO.js";
import { Query, Body } from "../common/params/params.js";
import { Guard } from "../common/guard/Guard.js";
import { Pipe } from "../common/pipe/Pipe.js";
// import type for constructor pipe
import type { CreateUserDto } from "./pipes/pipes.js";

@Controller('')
@Pipe(ParamTypeCheck)
export class UsersController {

    constructor(private userService: UserService) {}

    @Get('/')
    findAll(): User[] {
        return this.userService.retreiveAllUsers();
    }

    @Post('/')
    @Guard(ApiKeyGuard)
    @Pipe(new ZodValidationPipe(creatueUserSchema))
    createNewUser(@Body() newUser: CreateUserDto) {
        this.userService.addNewUser(newUser);
    }

    @Put('/')
    @Guard(ApiKeyGuard)
    @Pipe(ZodValidationPipe)
    replaceUser(@Body() newUser: CreateUserDto) {
        this.userService.replaceUser(newUser);
    }

    @Patch('/')
    @Guard(ApiKeyGuard)
    @Pipe(ZodValidationPipe)
    updateUser(@Body() newUser: CreateUserDto) {
        this.userService.updateUser(newUser);
    }

    @Delete('/')
    @Guard(ApiKeyGuard)
    deleteUserByEmail(@Query('email') email: any) {
        this.userService.deleteUser(email);
    }
}