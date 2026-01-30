import express from 'express';
import { container } from '../container/container.js';
import { HttpException } from '../exception/HttpException.js';
import { ParamType } from '../params/params.js';
import { ExecutionContext } from '../guard/Guard.js';

import type { Request, Response } from 'express';

function collectGuards(controller: any, method: string) {
    const ctrlGuards = Reflect.getMetadata('guards', controller.constructor) ?? [];
    const methodGuards = Reflect.getMetadata('guards', controller,  method) ?? [];
    return [...ctrlGuards, ...methodGuards];
}

async function runGuards(guards: any[], ctx: ExecutionContext, container: any) {
    for(const guard_ of guards) {
        const guard = container.resolve(guard_);
        const allowed = await guard.canActivate(ctx);
        if(!allowed) {
            throw new HttpException(403, 'Forbidden');
        }
    }
}

async function executeHandler({
  req,
  controller,
  methodName,
  container,
} : {
  req: Request;
  controller: any;
  methodName: string;
  container: any;
}) {
  try {
    const method = controller[methodName];
    const paramMeta = Reflect.getMetadata('params', controller, methodName) ?? [];

    const args: any[] = [];
    for (const param of paramMeta) {
        switch(param.type) {
            case ParamType.BODY:
                args[param.index] = req.body;
                break;
            case ParamType.QUERY:
                args[param.index] = req.query[param.data];
                break;
            case ParamType.PARAM:
                args[param.index] = req.params[param.name];
                break;
            default:
                break;
        }
    }

    // Apply guards
    const guards = collectGuards(controller, methodName);
    const ctx = new ExecutionContext(req, controller, method);
    await runGuards(guards, ctx, container);

    return await method.apply(controller, args);
  } catch (e: any) {
    if (e instanceof HttpException) throw e;
    throw new HttpException(500, e.message);
  }
}

export class MiniNestFactory {
    static async create(AppModule: any) {
        const app = express();
        app.use(express.json());
        this.initModule(AppModule, app, container);
        return {
            listen(port: number) {
                app.listen(port);
                console.log(`http://localhost:${port}`);
            }
        }
    }

    private static initModule(Module: any, app: any, container: any) {
        const meta = Reflect.getMetadata('module', Module);
        meta.providers?.forEach((p: any) => container.resolve(p));
        meta.controllers?.forEach((Controller: any) => {
            container.register(Controller, Controller);
            const prefix = Reflect.getMetadata('prefix', Controller) ?? '';
            const controller = container.resolve(Controller);
            const routes = Reflect.getMetadata('routes', Controller) ?? [];
            routes.forEach((route: any) => {
                app[route.method.toLowerCase()](
                prefix + route.path,
                async (req: Request, res: Response) => {
                        try {
                            const result = await executeHandler({
                                req,
                                controller,
                                methodName: route.handlerName,
                                container,
                            });
                        res.json(result);
                        } catch (e: any) {
                            res.status(e.status ?? 500).json({ message: e.message });
                        }
                    },
                );
            })
        });
    }
}