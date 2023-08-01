/**
 * @author GuangHui
 * @description 公式
 */
import { transformLatexToSVGStrAndDataUrl } from '@doonce/latex-svg-dataurl';
import { getCssFontDesc, measureImgSize } from '@doonce/utils';
import { Base, LayoutItemTypeEnum } from '../base';
export var FormulaRenderTypeEnum;
(function (FormulaRenderTypeEnum) {
    FormulaRenderTypeEnum["SVG"] = "SVG";
    FormulaRenderTypeEnum["IMG"] = "IMG";
})(FormulaRenderTypeEnum || (FormulaRenderTypeEnum = {}));
export class Formula extends Base {
    layoutItemType = LayoutItemTypeEnum.FORMULA;
    canLineBreak = false;
    rawContent;
    content = '';
    /** 公式转换成的 svg 用什么方式渲染,svg 节点插入还是图片展示 */
    formulaRenderType;
    globalFontConfig;
    debug;
    svgEl = null;
    rowNo;
    constructor({ rawContent, globalFontConfig, formulaRenderType, debug, rowNo }) {
        super();
        if (!rawContent || !globalFontConfig || !formulaRenderType)
            throw new Error('rawContent globalFontConfig and formulaRenderType is required');
        this.rawContent = rawContent;
        this.globalFontConfig = globalFontConfig;
        this.formulaRenderType = formulaRenderType;
        this.debug = debug ?? false;
        this.rowNo = rowNo;
    }
    async init(force = false) {
        /** 已经初始化,并不是强制初始化,则跳过 */
        if (this.initialized && !force)
            return;
        const { svgStr, dataUrl } = await this.getSvgStrAndDataUrl();
        if (this.debug) {
            console.group(`rawContent: ${this.rawContent}`);
            console.log('svgStr :>> ', svgStr);
            console.log('dataUrl :>> ', dataUrl);
            console.groupEnd();
        }
        /** 手动指定 img 渲染方式 */
        if (this.formulaRenderType === FormulaRenderTypeEnum.IMG) {
            this.content = dataUrl;
        }
        else {
            const svgEl = this.parse2SvgEl(svgStr);
            if (svgEl) {
                /** svg 支持 */
                this.content = svgStr;
                this.svgEl = svgEl;
            }
            else {
                // ? 兜底是否合适?如果不能反序列化为 svg 节点,那 mathjax 渲染为svg 就应该有问题了
                // ? 此处值得再考虑下
                /**  svg 不支持,兜底使用图片形式渲染 */
                this.formulaRenderType = FormulaRenderTypeEnum.IMG;
                this.content = dataUrl;
            }
        }
        const { width, height } = await this.measureSize();
        this.width = width;
        this.height = height;
        this.initialized = true;
    }
    async getSvgStrAndDataUrl() {
        return await transformLatexToSVGStrAndDataUrl({ latex: this.rawContent });
    }
    parse2SvgEl(svgStr) {
        const doc = new DOMParser().parseFromString(svgStr, 'image/svg+xml');
        return doc.querySelector('svg');
    }
    async measureSize() {
        const { width, height } = this.formulaRenderType === FormulaRenderTypeEnum.SVG
            ? this.measureSizeWithSvgEl(this.svgEl, this.globalFontConfig)
            : await this.measureSizeWithSvgDataUrl(this.content);
        return { width, height };
    }
    measureSizeWithSvgEl(svgEl, globalFontConfig) {
        if (!svgEl)
            throw new Error('svgEl is required');
        let frag = document.createDocumentFragment();
        let div = document.createElement('div');
        /** 设置字体 */
        div.style.cssText = `font:${getCssFontDesc({
            ...globalFontConfig,
            lineHeight: globalFontConfig.lineHeight + 'px'
        })};visibility: hidden;position: absolute;left: -100vw;`;
        div.appendChild(svgEl);
        frag.appendChild(div);
        document.body.appendChild(frag);
        const { width, height } = svgEl.getBoundingClientRect();
        document.body.removeChild(div);
        return { width, height };
    }
    async measureSizeWithSvgDataUrl(svgDataUrl) {
        return await measureImgSize(svgDataUrl);
    }
}
//# sourceMappingURL=Formula.js.map