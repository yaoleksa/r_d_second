export class User {
    public name: string;
    public email: string;
    constructor(name: string, email: string) {
        if(!email.match(new RegExp('(.+)@(.+)\\.(.+)'))) {
            throw new Error('INVALID EMAIL FORMAT! [any-text]@[any-text].[any-text]');
        }
        this.name = name;
        this.email = email;
    }
}