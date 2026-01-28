export function Controller(prefix = '') {
    return function(target: any) {
        Reflect.defineMetadata('prefix', prefix, target);
    };
}

export function isContoller(target: any) {
    return Reflect.hasMetadata('prefix', target);
}