export function Controller(prefix = '') {
    return function (target) {
        Reflect.defineMetadata('mini:prefix', prefix, target);
    };
}
export function isContoller(target) {
    return Reflect.hasMetadata('mini:prefix', target);
}
//# sourceMappingURL=Controller.js.map