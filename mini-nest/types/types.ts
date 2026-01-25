export interface ArgumentMetadata {
    readonly index: number;
    readonly type: any;
    readonly metatype?: any | undefined,
    readonly data?: string | undefined;
    readonly name?: string | undefined;
}