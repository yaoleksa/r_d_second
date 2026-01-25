type Method = 'get' | 'post' | 'put' | 'patch' | 'delete';
export declare function Route(method: Method, path?: string): (target: any, key: string) => void;
export declare const Get: (p?: string) => (target: any, key: string) => void;
export declare const Post: (p?: string) => (target: any, key: string) => void;
export declare const Put: (p?: string) => (target: any, key: string) => void;
export declare const Patch: (p?: string) => (target: any, key: string) => void;
export declare const Delete: (p?: string) => (target: any, key: string) => void;
export {};
//# sourceMappingURL=HttpLayers.d.ts.map