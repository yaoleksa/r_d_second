export declare class ExecutionContext {
    readonly req: any;
    readonly controller: any;
    readonly handler: Function;
    constructor(req: any, controller: any, handler: Function);
}
export interface CanActivate {
    сanActivate(ctx: ExecutionContext): boolean | Promise<boolean>;
}
export declare function Guard(...guards: any[]): (target: any, key?: string) => void;
//# sourceMappingURL=Guard.d.ts.map