/**
 * @author GuangHui
 * @description 文本组
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class TextGroup extends Base {
    layoutItemType = LayoutItemTypeEnum.TEXT_GROUP;
    canLineBreak = false;
    groups = [];
    rawContent = '';
    content = '';
    getPos() {
        throw new Error('Method not implemented.');
    }
    getSize() {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=TextGroup.js.map