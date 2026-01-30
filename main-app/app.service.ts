import { ExecutionContext } from "../common/guard/Guard.js";
import { Injectible } from "../common/ioc/Injectable.js";
import { User } from "./dto/userDTO.js";

@Injectible()
export class UserCheck {
    canActivate(ctx: ExecutionContext): boolean {
        return !ctx.req.body || 
        (ctx.req.body.name && 
            ctx.req.body.email && 
            new User(ctx.req.body.name, ctx.req.body.email) && 
            Object.keys(ctx.req.body).length === 2);
    }
}

@Injectible()
export class UserService {
    private readonly users: User[] = [];
    // coresponding with the GET HTTP request
    retreiveAllUsers(): User[] {
        return this.users;
    };
    // coresponding with the POST HTTP request
    addNewUser(newUser: User) {
        this.users.push(newUser);
    };
    // coresponding with the PUT HTTP request
    replaceUser(renewUser: User) {
        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i]?.email === renewUser.email) {
                this.users[i] = renewUser;
            }
        }
    };
    // coresponding with the PATCH HTTP request
    updateUser(updatedUser: User) {
        for(let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            if(user?.email === updatedUser.email) {
                user.name = updatedUser.name;
            }
        }
    }
    // coresponding with the DELETE HTTP request
    deleteUser(email: string) {
        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i]?.email === email) {
                this.users.splice(i, 1);
            }
        }
    }
}