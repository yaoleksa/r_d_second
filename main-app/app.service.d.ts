import { ExecutionContext } from "../common/guard/Guard.js";
import { User } from "./dto/userDTO.js";
import { PipeTransform } from "../common/pipe/Pipe.js";
export declare class ApiKeyGuard {
    canActivate(ctx: ExecutionContext): boolean;
}
export declare class UserCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext): void;
}
export declare class ParamTypeCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext): void;
}
export declare class EmailCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext): void;
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