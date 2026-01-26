export class User {
    name;
    email;
    constructor(name, email) {
        if (!email.match(new RegExp('(.+)@(.+)\\.(.+)'))) {
            throw new Error('INVALID EMAIL FORMAT! [any-text]@[any-text].[any-text]');
        }
        this.name = name;
        this.email = email;
    }
}
//# sourceMappingURL=userDTO.js.map