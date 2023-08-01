/**
 * @author GuangHui
 * @description 字符
 */
import { GlobalFontConfig } from '../../DoonceLayoutEngine';
import { Base, LayoutItemTypeEnum, IContent, ISize, IRow } from '../base';
export declare type CharCtrOptions = {
    rawContent: IContent['rawContent']; /** 原始内容 */
    globalFontConfig: GlobalFontConfig; /** 字体设置项 */
    debug?: boolean; /** 调试 */
    rowNo: IRow['rowNo'];
};
export declare class Char extends Base implements IContent, IRow {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: IContent['rawContent'];
    content: IContent['content'];
    globalFontConfig: GlobalFontConfig;
    debug: boolean;
    rowNo: IRow['rowNo'];
    constructor({ rawContent, globalFontConfig, debug, rowNo }: CharCtrOptions);
    init(force?: boolean): Promise<void>;
    measureSize(): ISize;
}
//# sourceMappingURL=Char.d.ts.map