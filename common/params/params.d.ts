export declare enum ParamType {
    PARAM = 0,
    QUERY = 1,
    BODY = 2
}
export declare function Param(data?: string): (target: any, name: string, idx: number) => void;
export declare function Body(): (target: any, name: string, idx: number) => void;
export declare function Query(data: string): (target: any, name: string, idx: number) => void;
//# sourceMappingURL=params.d.ts.map