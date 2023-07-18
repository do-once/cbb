/**
 * @author GuangHui
 * @description 公式
 */
import { Base, IContent, IPos, ISize, LayoutItemTypeEnum } from '../base';
export declare class Formula extends Base implements IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: string;
    content: string;
    getPos(): IPos | Promise<IPos>;
    getSize(): ISize | Promise<ISize>;
}
//# sourceMappingURL=Formula.d.ts.map