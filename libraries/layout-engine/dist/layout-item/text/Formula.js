/**
 * @author GuangHui
 * @description 公式
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class Formula extends Base {
    layoutItemType = LayoutItemTypeEnum.FORMULA;
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
//# sourceMappingURL=Formula.js.map