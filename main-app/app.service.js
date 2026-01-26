var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectible } from "../common/ioc/Injectable.js";
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
    // If second parameter is true search for user by email, if false search by name
    replaceUser(renewUser, byNameOrEmail) {
        for (let i = 0; i < this.users.length; i++) {
            if (this.users[i]?.email === renewUser.email) {
                this.users[i] = renewUser;
            }
        }
    }
    ;
    // coresponding with the PATCH HTTP request
    updateUser(updatedUser) {
        for (let user of this.users) {
            if (user.email === updatedUser.email) {
                user.name = updatedUser.name;
            }
        }
    }
    // coresponding with the DELETE HTTP request
    deleteUser(email) { }
};
UserService = __decorate([
    Injectible()
], UserService);
export { UserService };
//# sourceMappingURL=app.service.js.map