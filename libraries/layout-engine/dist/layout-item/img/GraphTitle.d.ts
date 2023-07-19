/**
 * @author GuangHui
 * @description 图片标题类
 */
import { GlobalFontOptions } from '../../DoonceLayoutEngine';
import { IContent, ISize, Base, LayoutItemTypeEnum } from '../base';
export declare class GraphTitle extends Base implements IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: string;
    content: string;
    globalFontOptions: GlobalFontOptions;
    constructor(rawContent: string, globalFontOptions: GlobalFontOptions);
    measureSize(): ISize;
}
//# sourceMappingURL=GraphTitle.d.ts.map