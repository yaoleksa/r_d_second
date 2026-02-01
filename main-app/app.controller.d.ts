import { UserService } from "./app.service.js";
import { User } from "./dto/userDTO.js";
import type { CreateUserDto } from "./pipes/pipes.js";
export declare class UsersController {
    private userService;
    constructor(userService: UserService);
    findAll(): User[];
    createNewUser(newUser: CreateUserDto): void;
    replaceUser(newUser: CreateUserDto): void;
    updateUser(newUser: CreateUserDto): void;
    deleteUserByEmail(email: any): void;
}
//# sourceMappingURL=app.controller.d.ts.map