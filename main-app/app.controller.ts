import { Controller } from "../common/controller/Controller.js";
import { Get, Post, Put, Patch, Delete } from "../common/http-layers/HttpLayers.js";
import { UserService } from "./app.service.js";
import { User } from "./dto/userDTO.js";
import { Query, Body } from "../common/params/params.js";

@Controller('')
export class UsersController {

    constructor(private userService: UserService) {}

    @Get('/')
    findAll(): User[] {
        return this.userService.retreiveAllUsers();
    }

    @Post('/')
    createNewUser(@Body() newUser: User) {
        this.userService.addNewUser(newUser);
    }

    @Put('/')
    replaceUser(@Body() newUser: User) {
        this.userService.replaceUser(newUser);
    }

    @Patch('/')
    updateUser(@Body() newUser: User) {
        this.userService.updateUser(newUser);
    }

    @Delete('/')
    deleteUserByEmail(@Query('email') email: any) {
        this.userService.deleteUser(email);
    }
}