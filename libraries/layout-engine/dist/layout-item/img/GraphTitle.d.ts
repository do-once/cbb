/**
 * @author GuangHui
 * @description 图片标题类
 */
import { Base, HorizontalAlignEnum, IContent, IHorizontalAlign, IPos, ISize, LayoutItemTypeEnum } from '../base';
export declare class GraphTitle extends Base implements IContent, IHorizontalAlign {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: string;
    content: string;
    horizontalAlign: HorizontalAlignEnum;
    getPos(): IPos;
    getSize(): Promise<ISize>;
}
//# sourceMappingURL=GraphTitle.d.ts.map