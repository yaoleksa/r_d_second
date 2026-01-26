import { container } from "../container/container.js";
export function Injectible(target, context) {
    return function (target) {
        container.register(target, target);
    };
}
//# sourceMappingURL=Injectable.js.map