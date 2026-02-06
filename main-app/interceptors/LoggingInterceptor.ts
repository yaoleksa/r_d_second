import { Injectible } from "../../common/ioc/Injectable.js";
import { Interceptor } from "../../common/interceptor/Interceptor.js";
import { ExecutionContext } from "../../common/guard/Guard.js";

@Injectible()
export class LoggingInterceptor implements Interceptor {
    intercept(ctx: ExecutionContext, next: () => Promise<any>) {
        const now = new Date();
        console.log(`executed at: ${now.toLocaleDateString()}T${now.toLocaleTimeString()}`);
        return next();
    }
}