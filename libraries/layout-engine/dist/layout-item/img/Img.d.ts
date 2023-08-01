/**
 * @author GuangHui
 * @description 图片类
 */
import { GlobalFontConfig } from '../../DoonceLayoutEngine';
import { ISize, Base, LayoutItemTypeEnum, ImgSurrounTypeEnum, IContent, IRow } from '../base';
export declare type ImgCtrOptions = {
    title?: string;
    rowNo: IRow['rowNo'];
    rawContent: IContent['rawContent'];
    globalFontConfig: GlobalFontConfig;
    imgSurroundType: ImgSurrounTypeEnum;
};
export declare class Img extends Base implements IContent, IRow {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    globalFontConfig: GlobalFontConfig;
    title: string;
    imgSurroundType: ImgSurrounTypeEnum;
    rawContent: IContent['rawContent'];
    content: IContent['content'];
    rowNo: IRow['rowNo'];
    constructor({ title, globalFontConfig, imgSurroundType, rawContent, rowNo }: ImgCtrOptions);
    init(force?: boolean): Promise<void>;
    measureSize(): Promise<ISize>;
    private haveTitle;
    measureTitleSize(): {
        width: number;
        height: number;
    };
}
//# sourceMappingURL=Img.d.ts.map