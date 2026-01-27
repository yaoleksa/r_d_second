import { UserService } from "./app.service.js";
import { User } from "./dto/userDTO.js";
export declare class UsersController {
    private userService;
    constructor(userService: UserService);
    findAll(): User[];
    createNewUser(newUser: User): void;
    replaceUser(newUser: User): void;
    updateUser(newUser: User): void;
    deleteUserByEmail(email: string): void;
}
//# sourceMappingURL=app.controller.d.ts.map