import 'reflect-metadata';
export declare class Container {
    #private;
    resolve<T>(token: any): T;
    register(token: any, member: any): void;
}
export declare const container: Container;
//# sourceMappingURL=container.d.ts.map