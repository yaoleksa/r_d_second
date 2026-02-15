import express from 'express';
import { container } from '../container/container.js';
import { HttpException } from '../exception/HttpException.js';
import { ParamType } from '../params/params.js';
import { ExecutionContext } from '../guard/Guard.js';
function collectGuards(controller, method) {
    const ctrlGuards = Reflect.getMetadata('guards', controller.constructor) ?? [];
    const methodGuards = Reflect.getMetadata('guards', controller, method) ?? [];
    return [...ctrlGuards, ...methodGuards];
}
function collectPipes(controller, method) {
    const ctrlPipe = Reflect.getMetadata('pipes', controller.constructor) ?? [];
    const methodPipes = Reflect.getMetadata('pipes', controller, method) ?? [];
    return [...ctrlPipe, ...methodPipes];
}
async function collectInterceptors(controller, method) {
    const ctrlInterceptors = Reflect.getMetadata('interceptors', controller.constructor) ?? [];
    const methodInterceptors = Reflect.getMetadata('interceptors', controller, method) ?? [];
    return [...ctrlInterceptors, ...methodInterceptors];
}
async function collectFilters(controller, method) {
    const ctrlFilters = Reflect.getMetadata('filters', controller.constructor) ?? [];
    const methodFilters = Reflect.getMetadata('filters', controller, method) ?? [];
    return [...ctrlFilters, ...methodFilters];
}
async function runGuards(guards, ctx, container) {
    for (const guard_ of guards) {
        const guard = container.resolve(guard_);
        const allowed = await guard.canActivate(ctx);
        if (!allowed) {
            throw new HttpException(403, 'Forbidden');
        }
    }
}
async function runPipes(pipes, ctx, container, value) {
    let transformedValue = value;
    for (const pipe_ of pipes) {
        const pipe = typeof pipe_ === 'function' ? container.resolve(pipe_) : pipe_;
        transformedValue = await pipe.transform(transformedValue, ctx);
    }
    return transformedValue;
}
async function runFilters(filters, ctx, container, error) {
    for (const filter_ of filters) {
        const filter = typeof filter_ === 'function' ? container.resolve(filter_) : filter_;
        const result = await filter.catch(error, ctx);
        if (typeof result !== 'undefined') {
            return result;
        }
    }
    return;
}
async function runInterceptors(interceptors, ctx, container, handler) {
    const chain = interceptors.reduceRight((next, interceptor_) => {
        const interceptor = typeof interceptor_ === 'function' ? container.resolve(interceptor_) : interceptor_;
        return () => interceptor.intercept(ctx, next);
    }, handler);
    return chain();
}
async function executeHandler({ req, controller, methodName, container, globalPipes, }) {
    try {
        const method = controller[methodName];
        const paramMeta = Reflect.getMetadata('params', controller, methodName) ?? [];
        const args = [];
        // define execution context
        const ctx = new ExecutionContext(req, controller, method);
        // Store body, parameter and query
        let value;
        for (const param of paramMeta) {
            switch (param.type) {
                case ParamType.QUERY:
                    args[param.index] = req.query[param.data];
                    break;
                case ParamType.BODY:
                    args[param.index] = req.body;
                    break;
                case ParamType.PARAM:
                    args[param.index] = req.params[param.data];
                    break;
                default:
                    break;
            }
            const paramPipes = [
                ...globalPipes,
                ...collectPipes(controller, methodName),
                ...(param.pipes ?? [])
            ];
            args[param.index] = await runPipes(paramPipes, ctx, container, args[param.index]);
        }
        // Apply guards
        const guards = collectGuards(controller, methodName);
        await runGuards(guards, ctx, container);
        // Apply interceptors
        const interceptors = await collectInterceptors(controller, methodName);
        const handler = () => method.apply(controller, args);
        if (interceptors.length === 0) {
            return await handler();
        }
        return await runInterceptors(interceptors, ctx, container, handler);
    }
    catch (e) {
        if (e instanceof HttpException)
            throw e;
        throw new HttpException(500, e.message);
    }
}
export class MiniNestFactory {
    // WANNA HIGHLIHT METHOD DEFINITION
    static async create(AppModule) {
        const app = express();
        app.use(express.json());
        const globalPipes = [];
        this.initModule(AppModule, app, container, globalPipes);
        return {
            useGlobalPipes(...pipes) {
                globalPipes.push(...pipes);
            },
            async listen(port, host, callback) {
                return new Promise((resolve, reject) => {
                    const server = app.listen(port, host, () => {
                        callback();
                        resolve(server);
                    });
                    server.on('error', err => {
                        reject(err);
                    });
                });
            }
        };
    }
    // NEXT METHOD
    static initModule(Module, app, container, globalPipes, initializedModule = new Set) {
        if (initializedModule.has(Module)) {
            return;
        }
        initializedModule.add(Module);
        const meta = Reflect.getMetadata('module', Module);
        if (!meta) {
            return;
        }
        // Recursive imports
        meta.imports?.forEach((importModule) => {
            this.initModule(importModule, app, container, globalPipes, initializedModule);
        });
        meta.providers?.forEach((p) => container.resolve(p));
        meta.controllers?.forEach((Controller) => {
            container.register(Controller, Controller);
            const prefix = Reflect.getMetadata('prefix', Controller) ?? '';
            const controller = container.resolve(Controller);
            const routes = Reflect.getMetadata('routes', Controller) ?? [];
            routes.forEach((route) => {
                app[route.method.toLowerCase()](prefix + route.path, async (req, res) => {
                    const filters = await collectFilters(controller, route.handlerName);
                    const ctx = new ExecutionContext(req, controller, controller[route.handlerName]);
                    try {
                        const result = await executeHandler({
                            req,
                            controller,
                            methodName: route.handlerName,
                            container,
                            globalPipes,
                        });
                        res.json(result);
                    }
                    catch (err) {
                        const filteredResult = await runFilters(filters, ctx, container, err);
                        if (typeof filteredResult !== 'undefined') {
                            res.json(filteredResult);
                            return;
                        }
                        res.status(err.status ?? 500).json({
                            message: err.message
                        });
                    }
                });
            });
        });
    }
}
//# sourceMappingURL=MiniNestFactory.js.map