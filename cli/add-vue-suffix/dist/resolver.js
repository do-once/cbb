/**
 * @author GuangHui
 * @description 路径解析器(webpack)
 */
import { create } from 'enhanced-resolve';
function factory(likeWebpackResolveConfig) {
    return create.sync(likeWebpackResolveConfig);
}
export const createMyResolver = factory;
//# sourceMappingURL=resolver.js.map