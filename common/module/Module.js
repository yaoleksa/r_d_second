export function Module(metadata) {
    return function (target) {
        Reflect.defineMetadata('module', metadata, target);
    };
}
//# sourceMappingURL=Module.js.map