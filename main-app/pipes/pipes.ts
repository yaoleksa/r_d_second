import { Injectable } from "../../common/ioc/Injectable.js";
import { ExecutionContext } from "../../common/guard/Guard.js";
import { PipeTransform } from "../../common/pipe/Pipe.js";
import { HttpException } from "../../common/exception/HttpException.js";
import { ZodSchema, z } from "zod/v3";

@Injectable()
export class ParamTypeCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext) {
        if(value && typeof value !== 'string' && (typeof value?.name !== 'string' || typeof value?.email !== 'string')) {
            throw new HttpException(400, 'Name and email fields must be a string');
        }
    }
}

@Injectable()
export class EmailCheck implements PipeTransform {
    transform(value: any, ctx: ExecutionContext) {
        if(value?.email && !value.email.match(new RegExp('(.+)@(.+)\\.(.+)'))) {
            throw new HttpException(400, 'INVALID EMAIL FORMAT! [any-text]@[any-text].[any-text]');
        } else if(typeof value === 'string' && !value.match(new RegExp('(.+)@(.+)\\.(.+)'))) {
            throw new HttpException(400, 'INVALID EMAIL FORMAT! [any-text]@[any-text].[any-text]');
        }
    }
}

@Injectable()
export class ZodValidationPipe implements PipeTransform {
    constructor(private zodSchema: ZodSchema) {}
    transform(value: any, ctx: ExecutionContext) {
        if(!value.name || !value.email || Object.keys(value).length !== 2) {
            throw new HttpException(400, 'INVALID USER PAYLOAD! User object must have two fiels: name and email');
        }
        try {
            return this.zodSchema.parse(value);
        } catch(err) {
            throw new HttpException(400, 'INVALID USER PAYLOAD! User object must have two fiels: name and email');
        }
    }
}

export const creatueUserSchema = z.object({
    name: z.string(),
    email: z.string()
}).required();

export type CreateUserDto = z.infer<typeof creatueUserSchema>;