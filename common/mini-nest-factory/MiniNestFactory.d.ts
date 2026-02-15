export declare class MiniNestFactory {
    static create(AppModule: any): Promise<{
        useGlobalPipes(...pipes: any[]): void;
        listen(port: number, host: string, callback: () => {}): Promise<any>;
    }>;
    private static initModule;
}
//# sourceMappingURL=MiniNestFactory.d.ts.map