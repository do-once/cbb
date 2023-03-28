/**
 * @author GuangHui
 * @description 输入 latex 字符串,输出 svg dataurl ,此 dataurl 可供 canvas 消费
 */
declare global {
    var MathJax: any;
}
/**
 * 将 latex 公式转为 svg dataurl
 *
 * @date 2023-03-28 17:33:45
 * @export
 * @param latex
 * @returns {Promise<string>} svg dataurl
 */
/**
 * 将 latex 公式转为 svg dataurl
 *
 * @date 2023-03-28 19:27:07
 * @export
 * @param latex latex 公式字符串
 * @param retryInterval 重试间隔 默认500ms
 * @param retryMaxCount 重试最大次数 默认10
 * @returns {Promise<string>} svg dataurl
 */
export declare function transformLatexToSVGDataUrl(latex: string, retryInterval?: number, retryMaxCount?: number): Promise<string>;
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