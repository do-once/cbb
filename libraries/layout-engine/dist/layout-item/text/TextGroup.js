/**
 * @author GuangHui
 * @description 文本组
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class TextGroup extends Base {
    layoutItemType = LayoutItemTypeEnum.TEXT_GROUP;
    canLineBreak = false;
    childs = [];
    rawContent = '';
    content = '';
    measureSize() {
        return this.childs.reduce((acc, cur) => {
            acc.width += cur.width;
            acc.height = Math.max(acc.height, cur.height);
            return acc;
        }, { width: 0, height: 0 });
    }
}
//# sourceMappingURL=TextGroup.js.map