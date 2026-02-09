import "reflect-metadata";
import { container } from "../container/container.js";
export function Injectable(target, context) {
    return function (target) {
        container.register(target, target);
    };
}
export function Inject(token) {
    return function (target, propertyKey, paramIndex) {
        const metadata = Reflect.getOwnMetadata("CUSTOM_TOKENS", target) || [];
        metadata[paramIndex] = token;
        container.register(token, token);
        Reflect.defineMetadata("CUSTOM_TOKENS", metadata, target);
    };
}
//# sourceMappingURL=Injectable.js.map