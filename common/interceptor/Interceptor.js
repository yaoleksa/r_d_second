export function Interceptor(...interceptors) {
    return function (target, key) {
        if (key) {
            Reflect.defineMetadata('interceptors', interceptors, target, key);
        }
        else {
            Reflect.defineMetadata('interceptors', interceptors, target);
        }
    };
}
//# sourceMappingURL=Interceptor.js.map