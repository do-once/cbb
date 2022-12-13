/**
 * @author GuangHui
 * @description 路径解析器(webpack)
 */
declare function factory(likeWebpackResolveConfig: unknown): (context?: any, path?: any, request?: any) => string | false;
export declare const createMyResolver: typeof factory;
export {};
//# sourceMappingURL=resolver.d.ts.map