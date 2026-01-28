import express from 'express';
import { Container } from '../container/container.js';
import { HttpException } from '../exception/HttpException.js';
import { ParamType } from '../params/params.js';
import { Module } from '../module/Module.js';

import type { Request, Response } from 'express';

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
    const paramMeta =
      Reflect.getMetadata(Symbol('params'), controller, methodName) ?? [];
    const paramPipes =
      Reflect.getMetadata(Symbol('pipes'), controller, methodName) ?? {};

    const args = [];

    for (let i = 0; i < paramMeta.length; i++) {
      const { type, name } = paramMeta[i];
      let value =
        type === ParamType.PARAM
          ? req.params[name]
          : type === ParamType.QUERY
          ? req.query[name]
          : req.body;

      for (const Pipe of paramPipes[i] ?? []) {
        value = container.resolve(Pipe).transform(value);
      }

      args[i] = value;
    }

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
        const container = new Container();
        this.initModule(AppModule, app, container);
        return {
            listen(port: number) {
                app.listen(port);
                console.log(`http://localhost:${port}`);
            }
        }
    }

    private static initModule(Module: any, app: any, container: any) {
        console.log(Module);
        const meta = Reflect.getMetadata(Module, Module);
        meta.providers?.forEach((p: any) => container.resolve(p));
        meta.controllers?.forEach((Controller: any) => {
            const prefix = Reflect.getMetadata(Symbol('controller'), Controller) ?? '';
            const controller = container.resolve(Controller);
            const routes = Reflect.getMetadata(Symbol('routes'), Controller) ?? [];
            routes.forEach((route: any) => {
                app[route.method.toLowerCase()](
                prefix + route.path,
                async (req: Request, res: Response) => {
                        try {
                            const result = await executeHandler({
                                req,
                                controller,
                                methodName: route.handler,
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