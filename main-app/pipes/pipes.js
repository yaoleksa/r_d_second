var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectible } from "../../common/ioc/Injectable.js";
import { HttpException } from "../../common/exception/HttpException.js";
import { ZodSchema, z } from "zod/v3";
let ParamTypeCheck = class ParamTypeCheck {
    transform(value, ctx) {
        if (value && (typeof value?.name !== 'string' || typeof value?.email !== 'string')) {
            throw new HttpException(400, 'Name and email fields must be a string');
        }
    }
};
ParamTypeCheck = __decorate([
    Injectible()
], ParamTypeCheck);
export { ParamTypeCheck };
let EmailCheck = class EmailCheck {
    transform(value, ctx) {
        if (value?.email && !value.email.match(new RegExp('(.+)@(.+)\\.(.+)'))) {
            throw new HttpException(400, 'INVALID EMAIL FORMAT! [any-text]@[any-text].[any-text]');
        }
        else if (typeof value === 'string' && !value.match(new RegExp('(.+)@(.+)\\.(.+)'))) {
            throw new HttpException(400, 'INVALID EMAIL FORMAT! [any-text]@[any-text].[any-text]');
        }
    }
};
EmailCheck = __decorate([
    Injectible()
], EmailCheck);
export { EmailCheck };
let ZodValidationPipe = class ZodValidationPipe {
    zodSchema;
    constructor(zodSchema) {
        this.zodSchema = zodSchema;
    }
    transform(value, ctx) {
        if (!value.name || !value.email || Object.keys(value).length !== 2) {
            throw new HttpException(400, 'INVALID USER PAYLOAD! User object must have two fiels: name and email');
        }
        try {
            return this.zodSchema.parse(value);
        }
        catch (err) {
            throw new HttpException(400, 'INVALID USER PAYLOAD! User object must have two fiels: name and email');
        }
    }
};
ZodValidationPipe = __decorate([
    Injectible(),
    __metadata("design:paramtypes", [ZodSchema])
], ZodValidationPipe);
export { ZodValidationPipe };
export const creatueUserSchema = z.object({
    name: z.string(),
    email: z.string()
}).required();
//# sourceMappingURL=pipes.js.map