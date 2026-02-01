import { Controller } from "../common/controller/Controller.js";
import { Get, Post, Put, Patch, Delete } from "../common/http-layers/HttpLayers.js";
import { UserService } from "./app.service.js";
import { ApiKeyGuard } from "./guards/guards.js";
import { ParamTypeCheck, EmailCheck, ZodValidationPipe } from "./pipes/pipes.js";
import { User } from "./dto/userDTO.js";
import { Query, Body } from "../common/params/params.js";
import { Guard } from "../common/guard/Guard.js";
import { Pipe } from "../common/pipe/Pipe.js";

@Controller('')
export class UsersController {

    constructor(private userService: UserService) {}

    @Get('/')
    findAll(): User[] {
        return this.userService.retreiveAllUsers();
    }

    @Post('/')
    @Guard(ApiKeyGuard)
    @Pipe(ParamTypeCheck)
    createNewUser(@Body() newUser: User) {
        this.userService.addNewUser(newUser);
    }

    @Put('/')
    @Guard(ApiKeyGuard)
    @Pipe(ParamTypeCheck)
    replaceUser(@Body() newUser: User) {
        this.userService.replaceUser(newUser);
    }

    @Patch('/')
    @Guard(ApiKeyGuard)
    @Pipe(ParamTypeCheck)
    updateUser(@Body() newUser: User) {
        this.userService.updateUser(newUser);
    }

    @Delete('/')
    @Guard(ApiKeyGuard)
    deleteUserByEmail(@Query('email') email: any) {
        this.userService.deleteUser(email);
    }
}