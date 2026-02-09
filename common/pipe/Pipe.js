export function UsePipe(...pipes) {
    return function (target, key) {
        if (key) {
            Reflect.defineMetadata('pipes', pipes, target, key);
        }
        else {
            Reflect.defineMetadata('pipes', pipes, target);
        }
    };
}
//# sourceMappingURL=Pipe.js.map