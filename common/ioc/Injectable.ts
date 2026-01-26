import { container } from "../container/container.js";

export function Injectible(target?: any, context?: ClassMethodDecoratorContext) {
    return function(target: any) {
        container.register(target, target);
    };
}