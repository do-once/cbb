/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class ImgPlaceHolder extends Base {
    layoutItemType = LayoutItemTypeEnum.IMG_PLACEHOLDER;
    canLineBreak = false;
    owner; /** 拥有占位符的组件 */
    globalFontOptions;
    constructor(owner, globalFontOptions) {
        super();
        this.owner = owner;
        this.globalFontOptions = globalFontOptions;
    }
    measureSize() {
        return {
            width: this.owner.width,
            height: this.globalFontOptions.lineHeight
        };
    }
}
//# sourceMappingURL=ImgPlaceholder.js.map