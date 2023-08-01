/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */
import { Base, LayoutItemTypeEnum } from '../base';
export class ImgPlaceholder extends Base {
    layoutItemType = LayoutItemTypeEnum.IMG_PLACEHOLDER;
    canLineBreak = false;
    ownerImg; /** 拥有占位符的图形组件 */
    rawContent = '';
    content = '';
    height;
    rowNo;
    constructor({ ownerImg, height, rowNo, y }) {
        if (!ownerImg)
            throw new Error('ownerImg is required');
        super();
        this.ownerImg = ownerImg;
        this.x = ownerImg.x;
        this.y = y;
        this.width = ownerImg.width;
        this.height = height;
        this.rowNo = rowNo;
    }
    init(force = false) {
        /** 不需要 init */
        console.log('ImgPlaceholder.inited');
    }
    measureSize() {
        return {
            width: this.width,
            height: this.height
        };
    }
}
//# sourceMappingURL=ImgPlaceholder.js.map