/**
 * @author GuangHui
 * @description 单字符
 */
import { GlobalFontOptions } from '../../DoonceLayoutEngine';
import { Base, LayoutItemTypeEnum, IContent, ISize } from '../base';
export declare type CharCtrParams = {
    rawContent: string; /** 原始内容 */
    globalFontOptions: GlobalFontOptions; /** 字体设置项 */
    debug?: boolean; /** 调试 */
};
export declare class Char extends Base implements IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: string;
    content: string;
    globalFontOptions: GlobalFontOptions;
    debug: boolean;
    constructor({ rawContent, globalFontOptions, debug }: CharCtrParams);
    init(): Promise<void>;
    measureSize(): ISize;
}
//# sourceMappingURL=Char.d.ts.map