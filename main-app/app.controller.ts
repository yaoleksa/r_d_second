import { Controller } from "../common/controller/Controller.js";
import { Get, Post, Put, Patch, Delete } from "../common/http-layers/HttpLayers.js";
import { UserCheck, ApiKeyGuard, UserService, ParamTypeCheck, EmailCheck } from "./app.service.js";
import { User } from "./dto/userDTO.js";
import { Query, Body } from "../common/params/params.js";
import { Guard } from "../common/guard/Guard.js";
import { Pipe } from "../common/pipe/Pipe.js";

@Pipe()
@Controller('')
export class UsersController {

    constructor(private userService: UserService) {}

    @Get('/')
    findAll(): User[] {
        return this.userService.retreiveAllUsers();
    }

    @Post('/')
    @Guard(ApiKeyGuard)
    @Pipe(UserCheck, ParamTypeCheck)
    createNewUser(@Body() newUser: User) {
        this.userService.addNewUser(newUser);
    }

    @Put('/')
    @Guard(ApiKeyGuard)
    @Pipe(UserCheck, ParamTypeCheck)
    replaceUser(@Body() newUser: User) {
        this.userService.replaceUser(newUser);
    }

    @Patch('/')
    @Guard(ApiKeyGuard)
    @Pipe(UserCheck, ParamTypeCheck)
    updateUser(@Body() newUser: User) {
        this.userService.updateUser(newUser);
    }

    @Delete('/')
    @Guard(ApiKeyGuard)
    deleteUserByEmail(@Query('email') email: any) {
        this.userService.deleteUser(email);
    }
}