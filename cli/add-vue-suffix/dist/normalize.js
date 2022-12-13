"use strict";
/**
 * @author GuangHui
 * @description 标准化路径
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizePath = void 0;
const path_1 = __importDefault(require("path"));
function normalizePath(p) {
    if (typeof p !== 'string')
        throw new TypeError('Path must be a string');
    return p.split(path_1.default.sep).join('/');
}
exports.normalizePath = normalizePath;
//# sourceMappingURL=normalize.js.map