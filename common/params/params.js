// define types before
export var ParamType;
(function (ParamType) {
    ParamType[ParamType["PARAM"] = 0] = "PARAM";
    ParamType[ParamType["QUERY"] = 1] = "QUERY";
    ParamType[ParamType["BODY"] = 2] = "BODY";
})(ParamType || (ParamType = {}));
export function Param(data) {
    return function (target, name, idx) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params = Reflect.getMetadata('params', target.constructor) ?? [];
        params.push({
            index: idx,
            metatype,
            type: ParamType.PARAM,
            data,
            name
        });
        Reflect.defineMetadata('params', params, target, name);
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
            type: ParamType.BODY,
            name
        });
        Reflect.defineMetadata('params', params, target, name);
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
            type: ParamType.QUERY,
            data,
            name
        });
        Reflect.defineMetadata('params', params, target, name);
    };
}
//# sourceMappingURL=params.js.map