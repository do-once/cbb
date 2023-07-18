/**
 * @author GuangHui
 * @description 图片占位,用于图片环绕时,底层文字占位用
 */
import { Base, IPos, ISize, LayoutItemTypeEnum } from '../base';
export declare class ImgPlaceHolder extends Base {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: string;
    content: string;
    getPos(): IPos | Promise<IPos>;
    getSize(): ISize | Promise<ISize>;
}
//# sourceMappingURL=ImgPlaceholder.d.ts.map