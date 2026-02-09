import "reflect-metadata";
import { container } from "../container/container.js";

export function Injectable(): ClassDecorator;
export function Injectable(token: any): ClassDecorator;
export function Injectable(target: any, context?: ClassMethodDecoratorContext): void;

export function Injectable(token?: any, context?: ClassMethodDecoratorContext) {
    if (typeof token === "function" && context === undefined) {
        container.register(token, token);
        return;
    }
    return function(target: any) {
        container.register(token ?? target, target);
    }
}

export function Inject(token?: any) {
    return function(target: Object, propertyKey: string | undefined, paramIndex: number) {
        const metadata = Reflect.getOwnMetadata("CUSTOM_TOKENS", target) || [];
        if(token !== undefined) {
            metadata[paramIndex] = token;
        }
        Reflect.defineMetadata("CUSTOM_TOKENS", metadata, target);
    }
}