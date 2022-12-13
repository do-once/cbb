"use strict";
/**
 * @author GuangHui
 * @description 入口
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.run = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const globby_1 = __importDefault(require("globby"));
const transformer_1 = __importDefault(require("./transformer"));
const normalize_1 = require("./normalize");
const file_save_1 = __importDefault(require("file-save"));
const { log, warn, succ, err } = require('./log');
const defaultGlobbyOptions = {
    absolute: true,
    ignore: ['**/node_modules/**']
};
function run({ withAST = false, // 是否使用AST进行转换
patterns = ['src/**/*.vue', 'src/**/*.js'], // 默认搜索src下面的vue和js文件
globbyOptions = {}, // 自定义globby的选项，会覆盖默认的选项
resolveConfig = {}, // https://www.npmjs.com/package/enhanced-resolve；和webpack.resolve一致；https://webpack.js.org/configuration/resolve/#resolve
debug = false // 设为true，则不会世界写文件
 }) {
    const _startTime = new Date().getTime();
    let _rewriteCount = 0;
    const options = Object.assign({}, defaultGlobbyOptions, globbyOptions);
    const maybeImportVue = globby_1.default.sync(patterns, options);
    if (!maybeImportVue || !maybeImportVue.length)
        return;
    const normalizedPaths = maybeImportVue.map(normalize_1.normalizePath);
    log('maybeImportVue', normalizedPaths);
    const vueFiles = normalizedPaths.filter((p) => /.vue$/.test(p));
    if (!resolveConfig || JSON.stringify(resolveConfig) === '{}') {
        warn('💢The `resolveConfig` config is empty, the alias path will be ignored!');
    }
    const myTransformer = new transformer_1.default(vueFiles, resolveConfig || {});
    for (let i = 0, cont = null, filePath = null; i < normalizedPaths.length; i++) {
        try {
            filePath = normalizedPaths[i];
            debug && log(`Processing: ${filePath}`);
            cont = fs_1.default.readFileSync(filePath, 'utf8');
            // 不包含需要替换的模块语法，直接跳过
            if (!transformer_1.default.MODULE_REG.test(cont)) {
                debug && warn(`Skip: ${filePath},cause not inculde need replace ESModule code`);
                continue;
            }
            const output = myTransformer.transform({
                code: cont,
                fileDir: path_1.default.dirname(filePath),
                withAST,
                debug
            });
            if (!debug && output && output !== cont) {
                (0, file_save_1.default)(filePath).write(output);
                _rewriteCount++;
                succ(`Rewrited: ${filePath}`);
            }
        }
        catch (error) {
            debug && err(error);
            continue;
        }
    }
    !debug && succ(`Total rewrite ${_rewriteCount} file;`);
    !debug && succ(`Total cost ${new Date().getTime() - _startTime}ms;`);
}
exports.run = run;
//# sourceMappingURL=index.js.map