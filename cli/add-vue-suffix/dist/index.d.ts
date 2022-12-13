/**
 * @author GuangHui
 * @description 入口
 */
export declare function run({ withAST, // 是否使用AST进行转换
patterns, // 默认搜索src下面的vue和js文件
globbyOptions, // 自定义globby的选项，会覆盖默认的选项
resolveConfig, // https://www.npmjs.com/package/enhanced-resolve；和webpack.resolve一致；https://webpack.js.org/configuration/resolve/#resolve
debug }: {
    withAST?: boolean | undefined;
    patterns?: string[] | undefined;
    globbyOptions?: {} | undefined;
    resolveConfig?: {} | undefined;
    debug?: boolean | undefined;
}): void;
//# sourceMappingURL=index.d.ts.map