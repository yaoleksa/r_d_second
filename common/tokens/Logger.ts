import { Injectable } from "../ioc/Injectable.js";
import { LOG } from "./token.js";

@Injectable(LOG)
export class ConsoleLogger {
    log(message: string): void {
        console.log(message);
    }
}