var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable } from '../../common/ioc/Injectable.js';
// Enable environment variables
import * as dotenv from 'dotenv';
dotenv.config();
let ApiKeyGuard = class ApiKeyGuard {
    canActivate(ctx) {
        // Compare headers API key with API key
        return ctx.req.headers.authorization && JSON.parse(ctx.req.headers.authorization)['X-API-Key'] === process.env.X_API_Key;
    }
};
ApiKeyGuard = __decorate([
    Injectable()
], ApiKeyGuard);
export { ApiKeyGuard };
//# sourceMappingURL=guards.js.map