import 'reflect-metadata';
import { AppModule } from "./app.module.js";
import { MiniNestFactory } from "../common/mini-nest-factory/MiniNestFactory.js";

// Define POST and HOST constants. If there are environmental variables, take them, hardcode otherwise
const PORT: number = parseInt(process.env.PORT || '3000');
const HOST: string = process.env.HOST || 'localhost';

(async function() {
    const application = await MiniNestFactory.create(AppModule);
    await application.listen(PORT, HOST, (): any => {
        console.log(`http://${HOST}:${PORT}`);
    });
})();