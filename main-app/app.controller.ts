import { Controller } from "../common/controller/Controller.js";
import { Get, Post, Put, Patch, Delete } from "../common/http-layers/HttpLayers.js";
import { UserService } from "./app.service.js";
import { ApiKeyGuard } from "./guards/guards.js";
import { ParamTypeCheck, EmailCheck, ZodValidationPipe, creatueUserSchema } from "./pipes/pipes.js";
import { User } from "./dto/userDTO.js";
import { Query, Body, Param } from "../common/params/params.js";
import { Guard } from "../common/guard/Guard.js";
import { Pipe } from "../common/pipe/Pipe.js";
import { LoggingInterceptor } from "./interceptors/LoggingInterceptor.js";
import { Interceptor } from "../common/interceptor/Interceptor.js";
// import type for constructor pipe
import type { CreateUserDto } from "./pipes/pipes.js";

@Controller('')
@UsePipe(ParamTypeCheck)
@Guard(ApiKeyGuard)
@Interceptor(LoggingInterceptor)
export class UsersController {

    constructor(private userService: UserService) {}

    @Get('/')
    findAll(): User[] {
        return this.userService.retreiveAllUsers();
    }

    @Get('/:email')
    findByEmail(@Param('email', EmailCheck) email: string) {
        return this.userService.retreiveUserByEmail(email);
    }

    @Post('/')
    @UsePipe(new ZodValidationPipe(creatueUserSchema))
    createNewUser(@Body() newUser: CreateUserDto): string {
        return this.userService.addNewUser(newUser);
    }

    @Put('/')
    @UsePipe(new ZodValidationPipe(creatueUserSchema))
    replaceUser(@Body() newUser: CreateUserDto): string {
        return this.userService.replaceUser(newUser);
    }

    @Patch('/')
    @UsePipe(new ZodValidationPipe(creatueUserSchema))
    updateUser(@Body() newUser: CreateUserDto): string {
        return this.userService.updateUser(newUser);
    }

    @Delete('/')
    deleteUserByEmail(@Query('email', EmailCheck) email: any): string {
        return this.userService.deleteUser(email);
    }
}