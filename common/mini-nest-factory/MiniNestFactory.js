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
async function collectInterceptors(controller, mehod) {
    const ctrlInterceptors = Reflect.getMetadata('interceptors', controller.constructor) ?? [];
    const methodInterceptors = Reflect.getMetadata('interceptors', controller, mehod) ?? [];
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
    for (const pipe_ of pipes) {
        const pipe = typeof pipe_ === 'function' ? container.resolve(pipe_) : pipe_;
        pipe.transform(value, ctx);
    }
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
        const pipes = [...globalPipes, ...collectPipes(controller, methodName)];
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
            value = args[param.index];
            if (param.pipes.length > 0) {
                pipes.push(...param.pipes);
            }
        }
        // Apply pipes
        await runPipes(pipes, ctx, container, value);
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
    static async create(AppModule) {
        const app = express();
        app.use(express.json());
        const globalPipes = [];
        this.initModule(AppModule, app, container, globalPipes);
        return {
            listen(port, host, callback) {
                app.listen(port, host, callback);
            }
        };
    }
    static initModule(Module, app, container, globalPipes) {
        const meta = Reflect.getMetadata('module', Module);
        meta.providers?.forEach((p) => container.resolve(p));
        meta.controllers?.forEach((Controller) => {
            container.register(Controller, Controller);
            const prefix = Reflect.getMetadata('prefix', Controller) ?? '';
            const controller = container.resolve(Controller);
            const routes = Reflect.getMetadata('routes', Controller) ?? [];
            routes.forEach((route) => {
                app[route.method.toLowerCase()](prefix + route.path, async (req, res) => {
                    const filters = await collectFilters(controller, route.handlerName);
                    const ctx = new ExecutionContext(req, controller, route.handlerName);
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
                    catch (e) {
                        const filteredResult = await runFilters(filters, ctx, container, e);
                        if (typeof filteredResult !== 'undefined') {
                            res.json(filteredResult);
                            return;
                        }
                        res.status(e.status ?? 500).json({
                            message: e.message
                        });
                    }
                });
            });
        });
    }
}
//# sourceMappingURL=MiniNestFactory.js.map