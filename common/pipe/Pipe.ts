import { ExecutionContext } from "../guard/Guard.js";

export interface PipeTransform<T=any> {
    transform(value: T, ctx: ExecutionContext): T;
}

export function UsePipe(...pipes: any[]) {
    return function(target: any, key?: string) {
        if(key) {
            Reflect.defineMetadata('pipes', pipes, target, key);
        } else {
            Reflect.defineMetadata('pipes', pipes, target);
        }
    }
}