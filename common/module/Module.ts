export function Module(metadata: {
    imports: any[],
    controllers: any[],
    providers: any[]
}) {
    return function(target: any) {
        Reflect.defineMetadata('module', metadata, target);
    };
}