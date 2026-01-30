// define execution context
export class ExecutionContext {
    req;
    controller;
    handler;
    constructor(req, controller, handler) {
        this.req = req;
        this.controller = controller;
        this.handler = handler;
    }
}
export function Guard(...guards) {
    return function (target, key) {
        if (key) {
            Reflect.defineMetadata('guards', guards, target, key);
        }
        else {
            Reflect.defineMetadata('guards', guards, target);
        }
    };
}
//# sourceMappingURL=Guard.js.map