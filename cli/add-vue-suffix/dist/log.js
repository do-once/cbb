"use strict";
/**
 * @author GuangHui
 * @description log
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.succ = exports.info = exports.warn = exports.err = void 0;
const chalk_1 = __importDefault(require("chalk"));
const log = console.log.bind(console);
function logFactory(chalkFn) {
    return (...args) => log(chalkFn(args[0]), ...args.slice(1));
}
exports.err = logFactory(chalk_1.default.hex('#f56c6c'));
exports.warn = logFactory(chalk_1.default.hex('#e6a23c'));
exports.info = logFactory(chalk_1.default.hex('#409eff'));
exports.succ = logFactory(chalk_1.default.hex('#67c23a'));
//# sourceMappingURL=log.js.map