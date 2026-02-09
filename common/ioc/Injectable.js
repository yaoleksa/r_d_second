import "reflect-metadata";
import { container } from "../container/container.js";
export function Injectable(token, context) {
    if (typeof token === "function" && context === undefined) {
        container.register(token, token);
        return;
    }
    return function (target) {
        container.register(token ?? target, target);
    };
}
export function Inject(token) {
    return function (target, propertyKey, paramIndex) {
        const metadata = Reflect.getOwnMetadata("CUSTOM_TOKENS", target) || [];
        if (token !== undefined) {
            metadata[paramIndex] = token;
        }
        Reflect.defineMetadata("CUSTOM_TOKENS", metadata, target);
    };
}
//# sourceMappingURL=Injectable.js.map