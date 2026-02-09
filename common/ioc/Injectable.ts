import "reflect-metadata";
import { container } from "../container/container.js";

export function Injectable(target?: any, context?: ClassMethodDecoratorContext) {
    return function(target: any) {
        container.register(target, target);
    };
}

export function Inject(token?: any) {
    return function(target: Object, propertyKey: string | undefined, paramIndex: number) {
        const metadata = Reflect.getOwnMetadata("CUSTOM_TOKENS", target) || [];
        metadata[paramIndex] = token;
        container.register(token, token);
        Reflect.defineMetadata("CUSTOM_TOKENS", metadata, target);
    }
}