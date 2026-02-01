import { ExecutionContext } from "../../common/guard/Guard.js";
import { PipeTransform } from "../../common/pipe/Pipe.js";
import { ZodSchema } from "zod/v3";
export declare class ParamTypeCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext): void;
}
export declare class EmailCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext): void;
}
export declare class ZodValidationPipe implements PipeTransform {
    private zodSchema;
    constructor(zodSchema: ZodSchema);
    transform(value: any, ctx: ExecutionContext): any;
}
//# sourceMappingURL=pipes.d.ts.map