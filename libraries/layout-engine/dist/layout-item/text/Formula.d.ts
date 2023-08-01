/**
 * @author GuangHui
 * @description 公式
 */
import { GlobalFontConfig } from '../../DoonceLayoutEngine';
import { Base, IContent, IRow, ISize, LayoutItemTypeEnum } from '../base';
export declare enum FormulaRenderTypeEnum {
    SVG = "SVG",
    IMG = "IMG"
}
export declare type FormulaCtrOptions = {
    rawContent: string; /** 公式原始内容 */
    globalFontConfig: GlobalFontConfig; /** 字体设置项 */
    formulaRenderType: FormulaRenderTypeEnum; /** 公式渲染类型,SVG(dom 节点) 或 IMG */
    debug?: boolean; /** 调试 */
    rowNo: IRow['rowNo'];
};
export declare class Formula extends Base implements IContent, IRow {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: IContent['rawContent'];
    content: IContent['content'];
    /** 公式转换成的 svg 用什么方式渲染,svg 节点插入还是图片展示 */
    formulaRenderType: FormulaRenderTypeEnum;
    globalFontConfig: GlobalFontConfig;
    debug: boolean;
    svgEl: SVGSVGElement;
    rowNo: IRow['rowNo'];
    constructor({ rawContent, globalFontConfig, formulaRenderType, debug, rowNo }: FormulaCtrOptions);
    init(force?: boolean): Promise<void>;
    getSvgStrAndDataUrl(): Promise<import("@doonce/latex-svg-dataurl").TransformLatexToSVGStrAndDataUrlRet>;
    parse2SvgEl(svgStr: string): SVGSVGElement | null;
    measureSize(): Promise<ISize>;
    measureSizeWithSvgEl(svgEl: SVGSVGElement, globalFontConfig: GlobalFontConfig): ISize;
    measureSizeWithSvgDataUrl(svgDataUrl: string): Promise<ISize>;
}
//# sourceMappingURL=Formula.d.ts.map