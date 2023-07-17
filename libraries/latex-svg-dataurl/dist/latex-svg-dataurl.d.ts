/**
 * @author GuangHui
 * @description 输入 latex 字符串,输出 svg dataurl ,此 dataurl 可供 canvas 消费
 */
declare global {
    var MathJax: any;
}
export declare type TransformLatexToSVGDataUrlParams = {
    latex: string; /** latex输入字符串 */
    retryInterval?: number; /** 渲染失败的重试间隔,默认500ms */
    retryMaxCount?: number; /** 渲染重试次数,默认10次 */
    outputType: 'dataUrl' | 'svgStr' | 'both'; /** 输出类型,dataurl svgel 转换的string 或 都输出;默认 dataurl*/
};
export declare type TransformLatexToSVGDataUrlRet = string | {
    dataUrl: string;
    svgStr: string;
};
/**
 * 将 latex 公式转为 svg dataurl
 *
 * @date 2023-03-28 19:27:07
 * @export
 * @param latex latex 公式字符串
 * @param retryInterval 重试间隔 默认500ms
 * @param retryMaxCount 重试最大次数 默认10
 * @returns {Promise<TransformLatexToSVGDataUrlRet>} svg dataurl
 */
export declare function transformLatexToSVGDataUrl({ latex, retryInterval, retryMaxCount, outputType }?: TransformLatexToSVGDataUrlParams): Promise<TransformLatexToSVGDataUrlRet>;
/**
 * 将 svg 元素内容转为 dataurl
 *
 * @date 2023-03-28 17:34:57
 * @export
 * @param svgEl
 * @returns {string} dataurl
 */
export declare function transformSvgEl2DataUrl(svgEl: SVGElement): string;
//# sourceMappingURL=latex-svg-dataurl.d.ts.map