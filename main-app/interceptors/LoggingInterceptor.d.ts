import { Interceptor } from "../../common/interceptor/Interceptor.js";
import { ExecutionContext } from "../../common/guard/Guard.js";
import { Logger } from "../../common/token/Logger.js";
export declare class LoggingInterceptor implements Interceptor {
    private logger;
    constructor(logger: Logger);
    intercept(ctx: ExecutionContext, next: () => Promise<any>): Promise<any>;
}
//# sourceMappingURL=LoggingInterceptor.d.ts.map