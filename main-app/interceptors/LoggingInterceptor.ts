import { Injectable, Inject } from "../../common/ioc/Injectable.js";
import { Interceptor } from "../../common/interceptor/Interceptor.js";
import { ExecutionContext } from "../../common/guard/Guard.js";
import { LOGGER, Logger } from "../../common/token/Logger.js";

@Injectable()
export class LoggingInterceptor implements Interceptor {
    constructor(@Inject(LOGGER) private logger: Logger) {}
    intercept(ctx: ExecutionContext, next: () => Promise<any>) {
        const now = new Date();
        this.logger.print(`executed at: ${now.toLocaleDateString()}T${now.toLocaleTimeString()}`);
        return next();
    }
}