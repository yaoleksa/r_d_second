var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Injectable, Inject } from "../../common/ioc/Injectable.js";
import { LOGGER, Logger } from "../../common/token/Logger.js";
let LoggingInterceptor = class LoggingInterceptor {
    logger;
    constructor(logger) {
        this.logger = logger;
    }
    intercept(ctx, next) {
        const now = new Date();
        this.logger.print(`executed at: ${now.toLocaleDateString()}T${now.toLocaleTimeString()}`);
        return next();
    }
};
LoggingInterceptor = __decorate([
    Injectable(),
    __param(0, Inject(LOGGER)),
    __metadata("design:paramtypes", [Logger])
], LoggingInterceptor);
export { LoggingInterceptor };
//# sourceMappingURL=LoggingInterceptor.js.map