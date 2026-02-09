var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from "../common/ioc/Injectable.js";
let UserService = class UserService {
    users = [];
    unsuccessfulMessage = 'There is no user with such email :(';
    // coresponding with the GET HTTP request
    retreiveAllUsers() {
        return this.users;
    }
    ;
    // corresponding with the GET HTTP request with paramether
    retreiveUserByEmail(email) {
        const result = this.users.filter(user => user.email === email);
        return result.length > 0 ? result[0] : this.unsuccessfulMessage;
    }
    // coresponding with the POST HTTP request
    addNewUser(newUser) {
        if (this.users.filter(user => user.email === newUser.email).length > 0) {
            return 'User with such email already exists!';
        }
        this.users.push(newUser);
        return 'User has been successfully created';
    }
    ;
    // coresponding with the PUT HTTP request
    replaceUser(renewUser) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]?.email === renewUser.email) {
                this.users[i] = renewUser;
                return 'User has been successfully replaced';
            }
        }
        return this.unsuccessfulMessage;
    }
    ;
    // coresponding with the PATCH HTTP request
    updateUser(updatedUser) {
        for (let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            if (user?.email === updatedUser.email) {
                user.name = updatedUser.name;
                return 'User has been successfully updated';
            }
        }
        return this.unsuccessfulMessage;
    }
    // coresponding with the DELETE HTTP request
    deleteUser(email) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]?.email == email) {
                this.users.splice(i, 1);
                return 'User successfully has been deleted ;)';
            }
        }
        return this.unsuccessfulMessage;
    }
};
UserService = __decorate([
    Injectable()
], UserService);
export { UserService };
//# sourceMappingURL=app.service.js.map