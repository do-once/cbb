/**
 * @author GuangHui
 * @description 图片类
 */
import { measureImgSize } from '@doonce/utils';
import { Base, LayoutItemTypeEnum } from '../base';
export class Graph extends Base {
    layoutItemType = LayoutItemTypeEnum.GRAPH;
    canLineBreak = false;
    src;
    constructor(src) {
        super();
        if (!src)
            throw new Error('src is required');
        this.src = src;
    }
    async measureSize() {
        return await measureImgSize(this.src);
    }
}
//# sourceMappingURL=Graph.js.map