import { Controller } from "../common/controller/Controller.js";
import { Get, Post, Put, Patch, Delete } from "../common/http-layers/HttpLayers.js";
import { UserCheck, UserService, ParamTypeCheck, EmailCheck } from "./app.service.js";
import { User } from "./dto/userDTO.js";
import { Query, Body } from "../common/params/params.js";
import { Guard } from "../common/guard/Guard.js";

@Guard(UserCheck)
@Controller('')
export class UsersController {

    constructor(private userService: UserService) {}

    @Get('/')
    findAll(): User[] {
        return this.userService.retreiveAllUsers();
    }

    @Post('/')
    @Guard(ParamTypeCheck, EmailCheck)
    createNewUser(@Body() newUser: User) {
        this.userService.addNewUser(newUser);
    }

    @Put('/')
    @Guard(ParamTypeCheck, EmailCheck)
    replaceUser(@Body() newUser: User) {
        this.userService.replaceUser(newUser);
    }

    @Patch('/')
    @Guard(ParamTypeCheck, EmailCheck)
    updateUser(@Body() newUser: User) {
        this.userService.updateUser(newUser);
    }

    @Delete('/')
    @Guard(EmailCheck)
    deleteUserByEmail(@Query('email') email: any) {
        this.userService.deleteUser(email);
    }
}