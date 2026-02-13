import { Injectable } from "../../common/ioc/Injectable.js";
import { ExecutionContext } from "../../common/guard/Guard.js";
import { PipeTransform } from "../../common/pipe/Pipe.js";
import { HttpException } from "../../common/exception/HttpException.js";
import { ZodSchema, z } from "zod/v3";

@Injectable()
export class ParamTypeCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext) {
        if(value && typeof value !== 'string' && (typeof value?.name !== 'string' || typeof value?.email !== 'string')) {
            throw new HttpException(400, 'INVALID PAYLOAD!');
        }
    }
}

@Injectable()
export class EmailCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext) {
        if(value?.email && !value.email.match(new RegExp('(.+)@(.+)\\.(.+)')) || (typeof value === 'string' && !value.match(new RegExp('(.+)@(.+)\\.(.+)')))) {
            throw new HttpException(400, 'INVALID PAYLOAD!');
        }
    }
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private zodSchema: ZodSchema) {}
    transform(value: any, ctx: ExecutionContext) {
        if(!value.name || !value.email || Object.keys(value).length !== 2) {
            throw new HttpException(400, 'INVALID PAYLOAD!');
        }
        try {
            return this.zodSchema.parse(value);
        } catch(err) {
            throw new HttpException(400, 'INVALID PAYLOAD!');
        }
    }
}

export const creatueUserSchema = z.object({
    name: z.string(),
    email: z.string()
}).required();

export type CreateUserDto = z.infer<typeof creatueUserSchema>;