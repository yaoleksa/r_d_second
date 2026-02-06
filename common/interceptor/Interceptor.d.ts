import { ExecutionContext } from "../guard/Guard.js";
export interface Interceptor {
    intercept(ctx: ExecutionContext, next: () => Promise<any>): Promise<any> | any;
}
export declare function Interceptor(...interceptors: any[]): (target: any, key?: string) => void;
//# sourceMappingURL=Interceptor.d.ts.map