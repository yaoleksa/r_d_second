import { container } from "../container/container.js";
function Injectible(target, context) {
    return function (target) {
        container.register(target, target);
    };
}
//# sourceMappingURL=Injectable.js.map