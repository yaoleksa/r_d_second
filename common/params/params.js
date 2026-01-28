export function Param(data) {
    return function (target, name, idx) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params = Reflect.getMetadata('params', target.constructor) ?? [];
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
;
export function Body() {
    return function (target, name, idx) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params = Reflect.getMetadata('params', target.constructor) ?? [];
        params.push({
            index: idx,
            metatype,
            type: 'body',
            name
        });
        Reflect.defineMetadata('mini:params', params, target.constructor);
    };
}
export function Query(data) {
    return function (target, name, idx) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params = Reflect.getMetadata('params', target.constructor) ?? [];
        params.push({
            index: idx,
            metatype,
            type: 'query',
            data,
            name
        });
        Reflect.defineMetadata('params', params, target.constructor);
    };
}
export var ParamType;
(function (ParamType) {
    ParamType[ParamType["PARAM"] = 0] = "PARAM";
    ParamType[ParamType["QUERY"] = 1] = "QUERY";
    ParamType[ParamType["BODY"] = 2] = "BODY";
})(ParamType || (ParamType = {}));
//# sourceMappingURL=params.js.map