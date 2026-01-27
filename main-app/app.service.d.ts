import { User } from "./dto/userDTO.js";
export declare class UserService {
    private readonly users;
    retreiveAllUsers(): User[];
    addNewUser(newUser: User): void;
    replaceUser(renewUser: User): void;
    updateUser(updatedUser: User): void;
    deleteUser(email: string): void;
}
//# sourceMappingURL=app.service.d.ts.map