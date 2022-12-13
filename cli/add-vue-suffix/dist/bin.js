"use strict";
/**
 * @author GuangHui
 * @description bin
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const arg_1 = require("./arg");
const log_1 = require("./log");
const index_1 = require("./index");
let resolveConfig = {};
try {
    // @ts-ignore
    const { resolve } = require(path_1.default.join(process.cwd(), arg_1.argv.resolveConfig));
    resolveConfig = resolve;
}
catch (error) {
    (0, log_1.err)('get an error when try to resolve resolveConfig', error);
}
(0, index_1.run)({
    resolveConfig,
    // @ts-ignore
    patterns: arg_1.argv.patterns,
    // @ts-ignore
    debug: arg_1.argv.debug,
    // @ts-ignore
    withAST: arg_1.argv.withAST
});
//# sourceMappingURL=bin.js.map