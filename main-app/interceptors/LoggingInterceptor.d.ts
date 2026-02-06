import { Interceptor } from "../../common/interceptor/Interceptor.js";
import { ExecutionContext } from "../../common/guard/Guard.js";
export declare class LoggingInterceptor implements Interceptor {
    intercept(ctx: ExecutionContext, next: () => Promise<any>): Promise<any>;
}
//# sourceMappingURL=LoggingInterceptor.d.ts.map