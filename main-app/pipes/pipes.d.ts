import { ExecutionContext } from "../../common/guard/Guard.js";
import { PipeTransform } from "../../common/pipe/Pipe.js";
import { ZodSchema, z } from "zod/v3";
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
export declare const creatueUserSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
}, "strip", z.ZodTypeAny, {
    email: string;
    name: string;
}, {
    email: string;
    name: string;
}>;
export type CreateUserDto = z.infer<typeof creatueUserSchema>;
//# sourceMappingURL=pipes.d.ts.map