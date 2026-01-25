import { ArgumentMetadata } from "../types/types.js";

export function Param(data?: string) {
    return function(target: any, name: string, idx: number) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params: Array<ArgumentMetadata> = Reflect.getMetadata('mini:params', target.constructor) ?? [];
        params.push({
            index: idx,
            metatype,
            type: 'param',
            data,
            name
        });
        Reflect.defineMetadata('mini:params', params, target.constructor);
    }
}