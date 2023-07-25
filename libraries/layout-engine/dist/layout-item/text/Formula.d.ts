/**
 * @author GuangHui
 * @description 公式
 */
import { GlobalFontOptions } from '../../DoonceLayoutEngine';
import { Base, IContent, ISize, LayoutItemTypeEnum } from '../base';
export declare enum FormulaRenderTypeEnum {
    SVG = "SVG",
    IMG = "IMG"
}
export declare type FormulaCtrParams = {
    rawContent: string; /** 公式原始内容 */
    globalFontOptions: GlobalFontOptions; /** 字体设置项 */
    formulaRenderType: FormulaRenderTypeEnum; /** 公式渲染类型,SVG(dom 节点) 或 IMG */
    debug?: boolean; /** 调试 */
};
export declare class Formula extends Base implements IContent {
    layoutItemType: LayoutItemTypeEnum;
    canLineBreak: boolean;
    rawContent: string;
    content: string;
    /** 公式转换成的 svg 用什么方式渲染,svg 节点插入还是图片展示 */
    formulaRenderType: FormulaRenderTypeEnum;
    globalFontOptions: GlobalFontOptions;
    debug: boolean;
    svgEl: SVGSVGElement;
    constructor({ rawContent, globalFontOptions, formulaRenderType, debug }: FormulaCtrParams);
    init(): Promise<void>;
    getSvgStrAndDataUrl(): Promise<import("@doonce/latex-svg-dataurl").TransformLatexToSVGStrAndDataUrlRet>;
    parse2SvgEl(svgStr: string): SVGSVGElement | null;
    measureSize(): Promise<ISize>;
    measureSizeWithSvgEl(svgEl: SVGSVGElement, globalFontOptions: GlobalFontOptions): ISize;
    measureSizeWithSvgDataUrl(svgDataUrl: string): Promise<ISize>;
}
//# sourceMappingURL=Formula.d.ts.map