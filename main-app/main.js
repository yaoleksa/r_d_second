import 'reflect-metadata';
import { AppModule } from "./app.modele.js";
import { MiniNestFactory } from "../common/mini-nest-factory/MiniNestFactory.js";
(async function () {
    const application = await MiniNestFactory.create(AppModule);
    await application.listen(3000);
})();
//# sourceMappingURL=main.js.map