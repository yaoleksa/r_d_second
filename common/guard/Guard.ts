// define execution context
export class ExecutionContext {
    constructor(public readonly req: any, public readonly controller: any, public readonly handler: Function) {}
}

// Guard contract interface
export interface CanActivate {
    сanActivate(ctx: ExecutionContext): boolean | Promise<boolean>;
}

export function Guard(...guards: any[]) {
    return function(target: any, key?: string) {
        if(key) {
            Reflect.defineMetadata('guards', guards, target, key);
        } else {
            Reflect.defineMetadata('guards', guards, target);
        }
    }
}