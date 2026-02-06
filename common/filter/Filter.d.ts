import { ExecutionContext } from "../guard/Guard.js";
export interface ExceptionFilter {
    catch(exception: any, ctx: ExecutionContext): any;
}
export declare function Filter(...filters: any[]): (target: any, key?: string) => void;
//# sourceMappingURL=Filter.d.ts.map