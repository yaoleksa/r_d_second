import { Injectible } from "../common/ioc/Injectable.js";
import { User } from "./dto/userDTO.js";

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
    // If second parameter is true search for user by email, if false search by name
    replaceUser(renewUser: User, byNameOrEmail: boolean) {
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