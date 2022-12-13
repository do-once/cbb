"use strict";
/**
 * @author GuangHui
 * @description 转换
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = __importDefault(require("@babel/types"));
const parser_1 = require("@babel/parser");
const traverse_1 = __importDefault(require("@babel/traverse"));
const generator_1 = __importDefault(require("@babel/generator"));
const log_1 = require("./log");
const normalize_1 = require("./normalize");
const resolver_1 = require("./resolver");
class Transformer {
    constructor(vueFiles = [], resolveConfig = {}) {
        this.resolveConfig = resolveConfig;
        this.vueFiles = vueFiles;
        this.resolver = (0, resolver_1.createMyResolver)(this.resolveConfig);
    }
    /**
     * 路径是否命中
     * @param {string} p 待检测路径
     * @returns {boolean} 是否命中
     */
    isHitted(p) {
        return this.vueFiles.includes(p);
    }
    transform({ code, fileDir, withAST = false, debug = false }) {
        return withAST ? this.transformWithAST(code) : this.transformWithReg(code, fileDir, debug);
    }
    transformWithAST(code, options = {
        sourceType: 'module',
        plugins: [
            // enable jsx
            'jsx'
        ]
    }) {
        // const testCode = `export * from 'test'; // ExportAllDeclaration
        // import "test.css"; // ImportDeclaration
        // import Test from 'test'; // ImportDeclaration
        // export { aa } from 'test2'; // ExportNamedDeclaration
        // export * as TT from 'test3'; // ExportNamedDeclaration
        // import(
        //     /* webpackChunkName:'AiClassReport' */ 'Views/AiClassReport/AiClassReport'
        //   ); // 动态导入
        // export default {test:3}; // ExportDefaultDeclaration，无source
        // `
        const ast = (0, parser_1.parse)(code, options);
        const that = this;
        (0, traverse_1.default)(ast, {
            enter: function (path, state) {
                // 动态导入import('xxx')
                if (types_1.default.isImport(path.node) &&
                    path.parentPath &&
                    path.parentPath.node &&
                    // @ts-ignore
                    path.parentPath.node.arguments &&
                    // @ts-ignore
                    path.parentPath.node.arguments.length) {
                    if (
                    // @ts-ignore
                    path.parentPath.node.arguments[0] &&
                        // @ts-ignore
                        typeof path.parentPath.node.arguments[0].vaule === 'string' &&
                        // @ts-ignore
                        path.parentPath.node.arguments[0].vaule.indexOf('.vue') < 0) {
                        try {
                            // @ts-ignore
                            const resolvedModulePath = that.resolver(process.cwd(), path.parentPath.node.arguments[0].value);
                            const normalizedPath = (0, normalize_1.normalizePath)(resolvedModulePath);
                            if (that.isHitted(normalizedPath)) {
                                // @ts-ignore
                                path.node.source.value += '.vue';
                            }
                        }
                        catch (error) { }
                    }
                }
                // 覆盖ExportAllDeclaration、ExportNamedDeclaration、ImportDeclaration
                if (types_1.default.isExportAllDeclaration(path.node) ||
                    types_1.default.isExportNamedDeclaration(path.node) ||
                    types_1.default.isImportDeclaration(path.node)) {
                    if (path.node &&
                        path.node.source &&
                        path.node.source.value &&
                        path.node.source.value.indexOf('.vue') < 0) {
                        try {
                            const resolvedModulePath = that.resolver(process.cwd(), path.node.source.value);
                            const normalizedPath = (0, normalize_1.normalizePath)(resolvedModulePath);
                            if (that.isHitted(normalizedPath)) {
                                path.node.source.value += '.vue';
                            }
                        }
                        catch (error) { }
                    }
                }
            }
        });
        return (0, generator_1.default)(ast, { retainLines: true, comments: true }, code).code;
    }
    transformWithReg(code, fileDir, debug) {
        if (typeof code !== 'string')
            return;
        return code.replace(Transformer.MODULE_REG, (...args) => {
            const { SMODULE, DMODULE } = args[7];
            const input = args[0];
            const modulePath = SMODULE || DMODULE || '';
            if (!modulePath) {
                debug && (0, log_1.warn)('modulePath did not matched');
                return input;
            }
            // 已经添加了.vue，则不替换
            if (/\.vue$/.test(modulePath)) {
                debug && (0, log_1.warn)(`Skip: ${modulePath}, cause already has \`.vue\` suffix`);
                return input;
            }
            try {
                const resolvedModulePath = this.resolver(/^\./.test(modulePath) ? fileDir : process.cwd(), // 相对路径，需要基于文件路径解析
                modulePath);
                const normalizedPath = (0, normalize_1.normalizePath)(resolvedModulePath);
                debug && (0, log_1.info)(`this.isHitted(${normalizedPath})`, this.isHitted(normalizedPath));
                if (!this.isHitted(normalizedPath))
                    return input;
                const output = this.normalizeTransPath(input, normalizedPath, modulePath, debug);
                debug && (0, log_1.info)('Transformed ESModule expression', output);
                return output;
            }
            catch (error) {
                debug && (0, log_1.err)(error);
                return input;
            }
        });
    }
    normalizeTransPath(input, normalizedPath, modulePath, debug) {
        // 单独处理/Dir这种会被解释为/Dir/index.vue的路径
        const { mainFiles } = this.resolveConfig;
        // /Dir被解析成/Dir/index.js还是/Dir/main.js，取决于mainFiles
        const mainFilesStr = mainFiles && mainFiles.length ? mainFiles.join('|') : 'index';
        const reg = new RegExp(`\/((?:${mainFilesStr}).vue)$`);
        const matched = reg.exec(normalizedPath);
        debug && (0, log_1.info)(`Filename matched:`, JSON.stringify(matched));
        // 解析出来的不是/Dir/index.vue路径(/Dir/test)，直接在其后添加.vue即可
        if (!matched)
            return input.replace(modulePath, modulePath + '.vue');
        const fileName = matched[1];
        return input.replace(modulePath, /\/$/.test(modulePath) // ./Test/
            ? modulePath + fileName
            : new RegExp(`\/${mainFilesStr}$`).test(modulePath) // ./Test/index
                ? modulePath + '.vue'
                : modulePath + '/' + fileName // ./Test
        );
    }
}
exports.default = Transformer;
Transformer.MODULE_REG = /(?:(?:(?:im|ex)port[\s{}\w,\-*]*?from\s*?(?<SQUOTE>['"]+?)(?<SMODULE>[^'"\s]+)\k<SQUOTE>)|(?:import\s*?\(\s*?(?:\/\*[^*/]*?\*\/)?\s*?(?<DQUOTE>['"])(?<DMODULE>[^'"\s]+)\k<DQUOTE>\s*?\);?));??/g;
//# sourceMappingURL=transformer.js.map