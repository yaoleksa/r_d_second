import { HttpException } from "../common/exception/HttpException.js";
import { ExecutionContext } from "../common/guard/Guard.js";
import { Injectible } from "../common/ioc/Injectable.js";
import { User } from "./dto/userDTO.js";
import { PipeTransform } from "../common/pipe/Pipe.js";
// Enable environment variables
import * as dotenv from 'dotenv';
dotenv.config();

@Injectible()
export class ApiKeyGuard {
    canActivate(ctx: ExecutionContext): boolean {
        // Compare headers API key with API key
        return ctx.req.headers.authorization && JSON.parse(ctx.req.headers.authorization)['X-API-Key'] === process.env.X_API_Key;
    }
}

@Injectible()
export class UserCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext) {
        if(!value.name || !value.email || Object.keys(value).length !== 2) {
            throw new HttpException(409, 'INVALID USER PAYLOAD! User object must have two fiels: name and email');
        }
    }
}

@Injectible()
export class ParamTypeCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext) {
        if(typeof value?.name !== 'string' || typeof value?.email !== 'string') {
            throw new HttpException(400, 'Name and email fields must be a string');
        }
    }
}

@Injectible()
export class EmailCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext) {
        if(value.email && !value.email.match(new RegExp('(.+)@(.+)\\.(.+)'))) {
            throw new HttpException(400, 'INVALID EMAIL FORMAT! [any-text]@[any-text].[any-text]');
        } else if(typeof value === 'string' && !value.match(new RegExp('(.+)@(.+)\\.(.+)'))) {
            throw new HttpException(400, 'INVALID EMAIL FORMAT! [any-text]@[any-text].[any-text]');
        }
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
            for(let j = 0; j < email.length; j++) {
                console.log(email.charAt(j), this.users[j]?.email.charAt(j));
            }
            if(this.users[i]?.email.toString().trim() === email.toString().trim()) {
                this.users.splice(i, 1);
                i--; console.log('?');
            }
        }
    }
}