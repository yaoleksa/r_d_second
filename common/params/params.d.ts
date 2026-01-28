export declare function Param(data?: string): (target: any, name: string, idx: number) => void;
export declare function Body(): (target: any, name: string, idx: number) => void;
export declare function Query(data: string): (target: any, name: string, idx: number) => void;
export declare enum ParamType {
    PARAM = 0,
    QUERY = 1,
    BODY = 2
}
//# sourceMappingURL=params.d.ts.map