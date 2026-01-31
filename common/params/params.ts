import { ArgumentMetadata } from "../types/types.js";

// define types before
export enum ParamType {
  PARAM,
  QUERY,
  BODY,
}

export function Param(data?: string) {
    return function(target: any, name: string, idx: number) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params: Array<ArgumentMetadata> = Reflect.getMetadata('params', target, name) ?? [];
        params.push({
            index: idx,
            metatype,
            type: ParamType.PARAM,
            data,
            name
        });
        Reflect.defineMetadata('params', params, target, name);
    }
};

export function Body(...pipes: any[]) {
    return function(target: any, name: string, idx: number) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params: Array<ArgumentMetadata> = Reflect.getMetadata('params', target, name) ?? [];
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

export function Query(data: string, ...pipes: any[]) {
    return function(target: any, name: string, idx: number) {
        const ps = Reflect.getMetadata('design:paramtypes', target, name) ?? [];
        const metatype = ps[idx];
        const params: Array<ArgumentMetadata> = Reflect.getMetadata('params', target, name) ?? [];
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