import { ArgumentMetadata } from "../types/types.js";

export function Param(data?: string) {
    return function(target: any, name: string, idx: number) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params: Array<ArgumentMetadata> = Reflect.getMetadata('params', target.constructor) ?? [];
        params.push({
            index: idx,
            metatype,
            type: 'param',
            data,
            name
        });
        Reflect.defineMetadata('mini:params', params, target.constructor);
    }
};

export function Body() {
    return function(target: any, name: string, idx: number) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params: Array<ArgumentMetadata> = Reflect.getMetadata('params', target.constructor) ?? [];
        params.push({
            index: idx,
            metatype,
            type: 'body',
            name
        });
        Reflect.defineMetadata('mini:params', params, target.constructor);
    };
}

export function Query(data: string) {
    return function(target: any, name: string, idx: number) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params: Array<ArgumentMetadata> = Reflect.getMetadata('params', target.constructor) ?? [];
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

export enum ParamType {
  PARAM,
  QUERY,
  BODY,
}