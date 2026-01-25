export function Param(data) {
    return function (target, name, idx) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params = Reflect.getMetadata('mini:params', target.constructor) ?? [];
        params.push({
            index: idx,
            metatype,
            type: 'param',
            data,
            name
        });
        Reflect.defineMetadata('mini:params', params, target.constructor);
    };
}
//# sourceMappingURL=params.js.map