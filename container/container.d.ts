import 'reflect-metadata';
export declare class Container {
    #private;
    resolve<T>(token: new (...args: any[]) => T): T;
    register<T extends Function>(token: T, member: T): void;
}
export declare const container: Container;
//# sourceMappingURL=container.d.ts.map