import { ExecutionContext } from "../guard/Guard.js";

export interface Interceptor {
    intercept(ctx: ExecutionContext, next: () => Promise<any>): Promise<any> | any;
}

export function Interceptor(...interceptors: any[]) {
    return function(target: any, key?: string) {
        if(key) {
            Reflect.defineMetadata('interceptors', interceptors, target, key);
        } else {
            Reflect.defineMetadata('interceptors', interceptors, target);
        }
    }
}