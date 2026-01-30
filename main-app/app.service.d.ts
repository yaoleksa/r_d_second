import { ExecutionContext } from "../common/guard/Guard.js";
import { User } from "./dto/userDTO.js";
export declare class UserCheck {
    canActivate(ctx: ExecutionContext): boolean;
}
export declare class UserService {
    private readonly users;
    retreiveAllUsers(): User[];
    addNewUser(newUser: User): void;
    replaceUser(renewUser: User): void;
    updateUser(updatedUser: User): void;
    deleteUser(email: string): void;
}
//# sourceMappingURL=app.service.d.ts.map