"use strict";
/**
 * @author GuangHui
 * @description 路径解析器(webpack)
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMyResolver = void 0;
const enhanced_resolve_1 = require("enhanced-resolve");
function factory(likeWebpackResolveConfig) {
    return enhanced_resolve_1.create.sync(likeWebpackResolveConfig);
}
exports.createMyResolver = factory;
//# sourceMappingURL=resolver.js.map