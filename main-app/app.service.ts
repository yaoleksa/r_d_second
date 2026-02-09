import { Injectable } from "../common/ioc/Injectable.js";
import { User } from "./dto/userDTO.js";

@Injectable()
export class UserService {
    private readonly users: User[] = [];
    private readonly unsuccessfulMessage: string = 'There is no user with such email :(';
    // coresponding with the GET HTTP request
    retreiveAllUsers(): User[] {
        return this.users;
    };
    // corresponding with the GET HTTP request with paramether
    retreiveUserByEmail(email: string): any {
        const result = this.users.filter(user => user.email === email);
        return result.length > 0 ? result[0] : this.unsuccessfulMessage;
    }
    // coresponding with the POST HTTP request
    addNewUser(newUser: User): string {
        if(this.users.filter(user => user.email === newUser.email).length > 0) {
            return 'User with such email already exists!';
        }
        this.users.push(newUser);
        return 'User has been successfully created';
    };
    // coresponding with the PUT HTTP request
    replaceUser(renewUser: User): string {
        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i]?.email === renewUser.email) {
                this.users[i] = renewUser;
                return 'User has been successfully replaced';
            }
        }
        return this.unsuccessfulMessage;
    };
    // coresponding with the PATCH HTTP request
    updateUser(updatedUser: User): string {
        for(let i = 0; i < this.users.length; i++) {
            let user = this.users[i];
            if(user?.email === updatedUser.email) {
                user.name = updatedUser.name;
                return 'User has been successfully updated';
            }
        }
        return this.unsuccessfulMessage;
    }
    // coresponding with the DELETE HTTP request
    deleteUser(email: string): string {
        for(let i = 0; i < this.users.length; i++) {
            if(this.users[i]?.email == email) {
                this.users.splice(i, 1);
                return 'User successfully has been deleted ;)';
            }
        }
        return this.unsuccessfulMessage;
    }
}