"use strict";
/**
 * @author GuangHui
 * @description 参数
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.argv = void 0;
const yargs_1 = __importDefault(require("yargs"));
exports.argv = yargs_1.default
    .boolean('withAST')
    .default('withAST', false)
    .array('patterns')
    .default('patterns', ['src/**/*.vue', 'src/**/*.js'])
    .boolean('debug')
    .default('debug', false);
//# sourceMappingURL=arg.js.map