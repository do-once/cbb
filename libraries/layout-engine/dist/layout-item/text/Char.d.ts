/**
 * @author GuangHui
 * @description 单字符
 */
import { GlobalFontOptions } from '../../DoonceLayoutEngine';
import { Base, LayoutItemTypeEnum, IContent, ISize } from '../base';
export declare class Char extends Base implements IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: string;
    content: string;
    globalFontOptions: GlobalFontOptions;
    constructor(rawContent: string, globalFontOptions: GlobalFontOptions);
    measureSize(): ISize;
}
//# sourceMappingURL=Char.d.ts.map