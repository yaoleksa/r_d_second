import { Controller } from "../common/controller/Controller.js";
import { Get, Post, Put, Patch, Delete } from "../common/http-layers/HttpLayers.js";
import { UserService } from "./app.service.js";
import { User } from "./dto/userDTO.js";
import { Query } from "../common/params/params.js";

@Controller('users')
export class CatsController {

    constructor(private userService: UserService) {}

    @Get('all')
    findAll(): User[] {
        return this.userService.retreiveAllUsers();
    }

    @Post('new-user')
    createNewUser(newUser: User) {
        this.userService.addNewUser(newUser);
    }

    @Put('replace-user')
    replaceUser(newUser: User) {
        this.userService.replaceUser(newUser);
    }

    @Patch('update-user')
    updateUser(newUser: User) {
        this.userService.updateUser(newUser);
    }

    @Delete()
    deleteUserByEmail(@Query('email') email: string) {
        this.userService.deleteUser(email);
    }
}