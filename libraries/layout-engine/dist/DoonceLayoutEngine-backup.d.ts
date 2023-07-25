/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */
import { Char, Formula, FormulaRenderTypeEnum, Graph, Img, ImgSurrounTypeEnum, LayoutItemTypeEnum, Row } from './layout-item';
export declare type GlobalFontOptions = {
    fontSize: number; /** 单位px */
    fontFamily: string;
    lineHeight: number; /** 单位px */
    fontStyle: string;
    fontWeight: string;
    fontVariant: string;
    source: string;
};
export declare type InputLayoutItemDesc = {
    layoutItemType: LayoutItemTypeEnum.CHAR | LayoutItemTypeEnum.FORMULA | LayoutItemTypeEnum.GRAPH;
    rawContent: string;
    imgSurroundType?: ImgSurrounTypeEnum;
};
export declare type DoonceLayoutEngineCtrOptions = {
    globalFontOptions: GlobalFontOptions; /** 字体 */
    inputLayoutItemDescList: InputLayoutItemDesc[]; /** 用户传入的布局项描述对象列表 */
    formulaRenderType: FormulaRenderTypeEnum; /** 公式渲染类型 */
    debug?: boolean;
};
export declare type LayoutMethodParams = {
    maxWidth: number; /** 单位px */
    padding?: [number, number, number, number]; /** 上右下左 padding */
    letterSpacing?: number; /** 字符间距 */
};
export declare class DoonceLayoutEngine {
    globalFontOptions: GlobalFontOptions;
    font: FontFace;
    /** 用户传入的布局项描述列表 */
    inputLayoutItemDescList: InputLayoutItemDesc[];
    /** 实例化后的用户布局项列表 */
    inputLayoutItemInstanceList: (Char | Formula | Graph)[];
    formulaRenderType: FormulaRenderTypeEnum;
    debug: boolean;
    constructor({ globalFontOptions, inputLayoutItemDescList, formulaRenderType, debug }: DoonceLayoutEngineCtrOptions);
    init(): Promise<void>;
    private instantiateInputLayoutItemDescList;
    layout({ maxWidth, padding, letterSpacing }: LayoutMethodParams): Row[] | {
        rowList: Row[];
        imgList: (Graph | Img)[];
    };
    private layoutWithImg;
    private layoutWithNoneImg;
    private updateCurRowInfo;
    /**
     * 获取最高 child 的高度
     *
     * @date 2023-07-21 16:43:37
     * @private
     * @param rowChild
     * @returns {number} 高度
     * @memberof DoonceLayoutEngine
     */
    private getHighestRowChildHeight;
    /**
     * 检查字体是否加载完成
     * 参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#fonts_that_have_loaded
     * 使用document.fonts.check()存在误检测,参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#nonexistent_fonts
     *
     * @date 2023-07-18 00:33:12
     * @returns {boolean} 是否加载
     * @memberof DoonceLayoutEngine
     */
    isFontLoaded(): boolean;
}
//# sourceMappingURL=DoonceLayoutEngine-backup.d.ts.map