/**
 * @author GuangHui
 * @description 图片标题类
 */
import { Base, HorizontalAlignEnum, LayoutItemTypeEnum } from '../base';
export class GraphTitle extends Base {
    layoutItemType = LayoutItemTypeEnum.GRAPH_TITLE;
    canLineBreak = false;
    rawContent = '';
    content = '';
    horizontalAlign = HorizontalAlignEnum.MIDDLE;
    getPos() {
        return {
            x: this.x,
            y: this.y
        };
    }
    async getSize() {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=GraphTitle.js.map