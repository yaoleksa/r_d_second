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
        const params = Reflect.getMetadata('params', target, name) ?? [];
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
export function Body(...pipes) {
    return function (target, name, idx) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params = Reflect.getMetadata('params', target, name) ?? [];
        params.push({
            index: idx,
            metatype,
            type: ParamType.BODY,
            name,
            pipes
        });
        Reflect.defineMetadata('params', params, target, name);
    };
}
export function Query(data, ...pipes) {
    return function (target, name, idx) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params = Reflect.getMetadata('params', target, name) ?? [];
        params.push({
            index: idx,
            metatype,
            type: ParamType.QUERY,
            data,
            name,
            pipes
        });
        Reflect.defineMetadata('params', params, target, name);
    };
}
//# sourceMappingURL=params.js.map