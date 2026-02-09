import { Injectable } from "../ioc/Injectable.js";
import { container } from "../container/container.js";

@Injectable()
export class Logger {
    print(msg: any): void {
        console.log(msg);
    }
}

export const LOGGER = "LOGGER";

container.register(LOGGER, Logger);
