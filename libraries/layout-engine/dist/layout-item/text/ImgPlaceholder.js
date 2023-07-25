/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class ImgPlaceholder extends Base {
    layoutItemType = LayoutItemTypeEnum.IMG_PLACEHOLDER;
    canLineBreak = false;
    owner; /** 拥有占位符的图形组件 */
    rawContent = '';
    content = '';
    height;
    constructor({ owner, height }) {
        if (!owner)
            throw new Error('owner is required');
        super();
        this.owner = owner;
        this.height = height;
        this.width = this.owner.width;
        this.x = this.owner.x;
    }
    measureSize() {
        // TODO 似乎不需要实现
        return {
            width: this.width,
            height: this.height
        };
    }
}
//# sourceMappingURL=ImgPlaceholder.js.map