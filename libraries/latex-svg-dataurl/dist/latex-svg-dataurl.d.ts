/**
 * @author GuangHui
 * @description 输入 latex 字符串,输出 svgStr 和dataUrl ,此 dataUrl 可供 canvas 消费
 */
declare global {
    var MathJax: any;
}
export declare type TransformLatexToSVGStrAndDataUrlPrams = {
    latex: string; /** latex输入字符串 */
    retryInterval?: number; /** 渲染失败的重试间隔,默认500ms */
    retryMaxCount?: number; /** 渲染重试次数,默认10次 */
};
export declare type TransformLatexToSVGStrAndDataUrlRet = {
    dataUrl: string; /**  转成 dataUrl 的字符串 */
    svgStr: string; /** 序列化后的 svg 字符串 */
};
/**
 * 输入 latex 字符串,输出 svgStr 和dataUrl
 *
 * @date 2023-07-19 21:10:27
 * @export
 * @param params 入参
 * @returns {TransformLatexToSVGStrAndDataUrlRet} 转换后的 svgStr 和 dataUrl 结果对象
 */
export declare function transformLatexToSVGStrAndDataUrl(params: TransformLatexToSVGStrAndDataUrlPrams): Promise<TransformLatexToSVGStrAndDataUrlRet>;
//# sourceMappingURL=latex-svg-dataurl.d.ts.map