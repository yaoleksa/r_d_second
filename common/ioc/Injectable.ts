import { container } from "../container/container.js";

export function Injectable(target?: any, context?: ClassMethodDecoratorContext) {
    return function(target: any) {
        container.register(target, target);
    };
}