import { ExecutionContext } from "../guard/Guard.js";

export interface ExceptionFilter {
    catch(exception: any, ctx: ExecutionContext): any;
}

export function Filter(...filters: any[]) {
    return function(target: any, key?: string) {
        if(key) {
            Reflect.defineMetadata('filters', filters, target, key);
        } else {
            Reflect.defineMetadata('filters', filters, target);
        }
    }
}