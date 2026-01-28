import express from 'express';
import { container } from '../container/container.js';
import { HttpException } from '../exception/HttpException.js';
import { ParamType } from '../params/params.js';
async function executeHandler({ req, controller, methodName, container, }) {
    try {
        const method = controller[methodName];
        const paramMeta = Reflect.getMetadata('params', controller, methodName) ?? [];
        const args = [];
        for (const param of paramMeta) {
            switch (param.type) {
                case ParamType.BODY:
                    args[param.index] = req.body;
                    break;
                case ParamType.QUERY:
                    args[param.index] = req.query[param.name];
                    break;
                case ParamType.PARAM:
                    args[param.index] = req.params[param.name];
                    break;
                default:
                    break;
            }
        }
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