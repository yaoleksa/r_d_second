export function Controller(prefix = '') {
    return function (target) {
        Reflect.defineMetadata('prefix', prefix, target);
    };
}
export function isContoller(target) {
    return Reflect.hasMetadata('prefix', target);
}
//# sourceMappingURL=Controller.js.map