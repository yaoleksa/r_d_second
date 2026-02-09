import { Injectable, Inject } from "../../common/ioc/Injectable.js";
import { Interceptor } from "../../common/interceptor/Interceptor.js";
import { ExecutionContext } from "../../common/guard/Guard.js";
import { LOG } from "../../common/tokens/token.js";

@Injectable()
export class LoggingInterceptor implements Interceptor {
    constructor(@Inject(LOG) private readonly logger: { log(msg: string): void }) {}
    intercept(ctx: ExecutionContext, next: () => Promise<any>) {
        const now = new Date();
        console.log(`executed at: ${now.toLocaleDateString()}T${now.toLocaleTimeString()}`);
        return next();
    }
}