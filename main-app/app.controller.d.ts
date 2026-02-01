import { UserService } from "./app.service.js";
import { User } from "./dto/userDTO.js";
import type { CreateUserDto } from "./pipes/pipes.js";
export declare class UsersController {
    private userService;
    constructor(userService: UserService);
    findAll(): User[];
    findByEmail(email: string): any;
    createNewUser(newUser: CreateUserDto): string;
    replaceUser(newUser: CreateUserDto): string;
    updateUser(newUser: CreateUserDto): string;
    deleteUserByEmail(email: any): string;
}
//# sourceMappingURL=app.controller.d.ts.map