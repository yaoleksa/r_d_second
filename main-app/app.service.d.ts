import { User } from "./dto/userDTO.js";
export declare class UserService {
    private readonly users;
    private readonly unsuccessfulMessage;
    retreiveAllUsers(): User[];
    retreiveUserByEmail(email: string): any;
    addNewUser(newUser: User): string;
    replaceUser(renewUser: User): string;
    updateUser(updatedUser: User): string;
    deleteUser(email: string): string;
}
//# sourceMappingURL=app.service.d.ts.map