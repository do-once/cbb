/**
 * @author GuangHui
 * @description 公式
 */
import { GlobalFontOptions } from '../../DoonceLayoutEngine';
import { Base, IContent, ISize, LayoutItemTypeEnum } from '../base';
export declare class Formula extends Base implements IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: string;
    content: string;
    globalFontOptions: GlobalFontOptions;
    constructor(rawContent: string, globalFontOptions: GlobalFontOptions);
    measureSize(): ISize;
}
//# sourceMappingURL=Formula.d.ts.map