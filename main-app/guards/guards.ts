import { Injectable } from '../../common/ioc/Injectable.js';
import { ExecutionContext } from '../../common/guard/Guard.js';
// Enable environment variables
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class ApiKeyGuard {
    canActivate(ctx: ExecutionContext): boolean {
        // Compare headers API key with API key
        return ctx.req.headers.authorization && JSON.parse(ctx.req.headers.authorization)['X-API-Key'] === process.env.X_API_Key;
    }
}