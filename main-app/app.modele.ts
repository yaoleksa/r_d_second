import { Module } from "../common/module/Module.js";
import { UsersController } from "./app.controller.js";
import { UserService } from "./app.service.js";

@Module({
    controllers: [UsersController],
    providers: [UserService]
})
export class AppModule { }