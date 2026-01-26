export function Controller(prefix = '') {
    return function(target: any) {
        Reflect.defineMetadata('mini:prefix', prefix, target);
    };
}

export function isContoller(target: any) {
    return Reflect.hasMetadata('mini:prefix', target);
}