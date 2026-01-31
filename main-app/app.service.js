var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { HttpException } from "../common/exception/HttpException.js";
import { Injectible } from "../common/ioc/Injectable.js";
// Enable environment variables
import * as dotenv from 'dotenv';
dotenv.config();
let ApiKeyGuard = class ApiKeyGuard {
    canActivate(ctx) {
        // Compare headers API key with API key
        return ctx.req.headers.authorization && JSON.parse(ctx.req.headers.authorization)['X-API-Key'] === process.env.X_API_Key;
    }
};
ApiKeyGuard = __decorate([
    Injectible()
], ApiKeyGuard);
export { ApiKeyGuard };
let UserCheck = class UserCheck {
    transform(value, ctx) {
        console.log(value);
        if (!value.name || !value.email || Object.keys(value).length !== 2) {
            throw new HttpException(409, 'INVALID USER PAYLOAD! User object must have two fiels: name and email');
        }
    }
};
UserCheck = __decorate([
    Injectible()
], UserCheck);
export { UserCheck };
let ParamTypeCheck = class ParamTypeCheck {
    transform(value, ctx) {
        console.log(value);
        if (typeof value?.name !== 'string' || typeof value?.email !== 'string') {
            throw new HttpException(400, 'Name and email fields must be a string');
        }
    }
};
ParamTypeCheck = __decorate([
    Injectible()
], ParamTypeCheck);
export { ParamTypeCheck };
let EmailCheck = class EmailCheck {
    transform(value, ctx) {
        console.log(value);
    }
};
EmailCheck = __decorate([
    Injectible()
], EmailCheck);
export { EmailCheck };
let UserService = class UserService {
    users = [];
    // coresponding with the GET HTTP request
    retreiveAllUsers() {
        return this.users;
    }
    ;
    // coresponding with the POST HTTP request
    addNewUser(newUser) {
        this.users.push(newUser);
    }
    ;
    // coresponding with the PUT HTTP request
    replaceUser(renewUser) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]?.email === renewUser.email) {
                this.users[i] = renewUser;
            }
        }
    }
    ;
    // coresponding with the PATCH HTTP request
    updateUser(updatedUser) {
        for (let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            if (user?.email === updatedUser.email) {
                user.name = updatedUser.name;
            }
        }
    }
    // coresponding with the DELETE HTTP request
    deleteUser(email) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]?.email === email) {
                this.users.splice(i, 1);
            }
        }
    }
};
UserService = __decorate([
    Injectible()
], UserService);
export { UserService };
//# sourceMappingURL=app.service.js.map