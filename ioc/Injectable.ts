import { container } from "../container/container.js";

function Injectible(target: any, context: ClassMethodDecoratorContext) {
    return function(target: any) {
        container.register(target, target);
    };
}