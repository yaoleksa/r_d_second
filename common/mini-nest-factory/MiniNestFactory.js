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
async function executeHandler({ req, controller, methodName, container, }) {
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
                    args[param.index] = req.params[param.name];
                    break;
                default:
                    break;
            }
            value = args[param.index];
        }
        // Apply guards
        const guards = collectGuards(controller, methodName);
        await runGuards(guards, ctx, container);
        // Apply pipes
        const pipes = collectPipes(controller, methodName);
        await runPipes(pipes, ctx, container, value);
        return await method.apply(controller, args);
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
        this.initModule(AppModule, app, container);
        return {
            listen(port) {
                app.listen(port);
                console.log(`http://localhost:${port}`);
            }
        };
    }
    static initModule(Module, app, container) {
        const meta = Reflect.getMetadata('module', Module);
        meta.providers?.forEach((p) => container.resolve(p));
        meta.controllers?.forEach((Controller) => {
            container.register(Controller, Controller);
            const prefix = Reflect.getMetadata('prefix', Controller) ?? '';
            const controller = container.resolve(Controller);
            const routes = Reflect.getMetadata('routes', Controller) ?? [];
            routes.forEach((route) => {
                app[route.method.toLowerCase()](prefix + route.path, async (req, res) => {
                    try {
                        const result = await executeHandler({
                            req,
                            controller,
                            methodName: route.handlerName,
                            container,
                        });
                        res.json(result);
                    }
                    catch (e) {
                        res.status(e.status ?? 500).json({ message: e.message });
                    }
                });
            });
        });
    }
}
//# sourceMappingURL=MiniNestFactory.js.map