/**
 * @author GuangHui
 * @description 单字符
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class Char extends Base {
    layoutItemType = LayoutItemTypeEnum.CHAR;
    canLineBreak = false;
    rawContent = '';
    content = '';
    getPos() {
        throw new Error('Method not implemented.');
    }
    getSize() {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=Char.js.map