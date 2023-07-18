/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class ImgPlaceHolder extends Base {
    layoutItemType = LayoutItemTypeEnum.IMG_PLACEHOLDER;
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
//# sourceMappingURL=ImgPlaceholder.js.map