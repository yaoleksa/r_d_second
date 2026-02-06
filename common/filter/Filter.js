export function Filter(...filters) {
    return function (target, key) {
        if (key) {
            Reflect.defineMetadata('filters', filters, target, key);
        }
        else {
            Reflect.defineMetadata('filters', filters, target);
        }
    };
}
//# sourceMappingURL=Filter.js.map