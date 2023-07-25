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
    imgSurroundType;
    constructor({ src, imgSurroundType }) {
        super();
        if (!src)
            throw new Error('src is required');
        this.src = src;
        this.imgSurroundType = imgSurroundType;
    }
    async init() {
        const { width, height } = await this.measureSize();
        this.width = width;
        this.height = height;
    }
    async measureSize() {
        return await measureImgSize(this.src);
    }
}
//# sourceMappingURL=Graph.js.map