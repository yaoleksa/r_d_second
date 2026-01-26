import { Controller } from "../common/controller/Controller.js";
import { Get } from "../common/http-layers/HttpLayers.js";

@Controller('users')
export class CatsController {
    @Get('all')
    findAll(): string[] {
        return [];
    }
}