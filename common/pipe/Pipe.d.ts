import { ExecutionContext } from "../guard/Guard.js";
export interface PipeTransform<T = any> {
    transform(value: T, ctx: ExecutionContext): T;
}
export declare function UsePipe(...pipes: any[]): (target: any, key?: string) => void;
//# sourceMappingURL=Pipe.d.ts.map