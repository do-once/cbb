/**
 * @author GuangHui
 * @description 图片类,应包含图片本身 Graph+图片的标题GraphTitle
 */
import { Base, LayoutItemTypeEnum, SurrounTypeEnum } from '../base';
export class Img extends Base {
    layoutItemType = LayoutItemTypeEnum.IMG;
    canLineBreak = false;
    childs = [];
    surroundType = SurrounTypeEnum.NONE;
    getPos() {
        throw new Error('Method not implemented.');
    }
    getSize() {
        throw new Error('Method not implemented.');
    }
    haveTitle() {
        return this.childs.length > 1;
    }
}
//# sourceMappingURL=Img.js.map