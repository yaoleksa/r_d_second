import 'reflect-metadata';
export class Container {
    #registered = new Map();
    #singletons = new Map();
    resolve(token) {
        if (this.#singletons.has(token))
            return this.#singletons.get(token);
        const cs = this.#registered.get(token);
        if (!cs) {
            throw new Error(`Token ${String(token)} is not registered.`);
        }
        if (typeof cs !== 'function') {
            return cs;
        }
        const deps = Reflect.getMetadata("design:paramtypes", cs) || [];
        const customTokens = Reflect.getOwnMetadata("CUSTOM_TOKENS", cs) || [];
        const resolved = new cs(...deps.map((d, index) => {
            const customToken = customTokens[index] ?? d;
            if (customToken === token) {
                throw new Error(`Circular dependency detected for token ${String(token)}.`);
            }
            return this.resolve(customToken);
        }));
        this.#singletons.set(token, resolved);
        this.#singletons.set(cs, resolved);
        return resolved;
    }
    register(token, member) {
        if (this.#registered.has(token)) {
            throw new Error(`Token ${String(token)} is already registered.`);
        }
        this.#registered.set(token, member);
    }
}
export const container = new Container();
//# sourceMappingURL=container.js.map