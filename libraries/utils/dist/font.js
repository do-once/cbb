/**
 * @author GuangHui
 * @description 字体相关库
 */
/**
 * 加载字体
 * 参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFace/FontFace
 *
 * @date 2023-07-17 23:33:33
 * @export
 * @param family 字体名
 * @param source 字体来源,格式为`url("path/to/font")`
 * @param [descriptors] 字体描述对象
 * @returns {FontFace} 需要加载的 FontFace 对象
 */
export async function loadFont(family, source, descriptors) {
    const font = new FontFace(family, source, descriptors);
    try {
        await font.load();
        /** 加载成功,加入字体集 */
        document.fonts.add(font);
    }
    catch (error) {
        console.log(`load font ${family} faild :>> `, error);
    }
    return font;
}
export const measureTextMetrics = ((text, cssFontDescStr) => {
    if (!text || !cssFontDescStr)
        throw new Error('text and cssFontDescStr is required');
    if (!measureTextMetrics._cachedCtx) {
        const cas = document.createElement('canvas');
        measureTextMetrics._cachedCtx = cas.getContext('2d');
    }
    measureTextMetrics._cachedCtx.font = cssFontDescStr;
    return measureTextMetrics._cachedCtx.measureText(text);
});
/**
 * 获取cssFont字体描述字符串
 *
 * 参考https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
 * 必须包含以下值：
 * <font-size><font-family>
 * 可以选择性包含以下值：
 * <font-style><font-variant><font-weight><line-height>
 * font-style, font-variant 和 font-weight 必须在 font-size 之前
 * 在 CSS 2.1 中 font-variant 只可以是 normal 和 small-caps
 * line-height 必须跟在 font-size 后面，由 "/" 分隔，例如 "16px/3"
 * font-family 必须最后指定
 * @example cssFontStr -> "italic small-caps bold 16px/20px SimSun
 * @date 2023-07-18 14:17:02
 * @export
 * @param fontDescObj 字体描述对象
 * @returns {string} 字体描述字符串
 */
export function getCssFontDesc({ fontSize, fontFamily, fontStyle, fontWeight, lineHeight, fontVariant }) {
    if (!fontSize || !fontFamily)
        throw new Error('fontSize and fontFamily is required');
    const temp = [
        fontStyle ?? '',
        fontVariant ?? '',
        fontWeight ?? '',
        `${typeof fontSize === 'number' ? `${fontSize}px` : fontSize}${lineHeight ? '/' + lineHeight : ''}`,
        fontFamily ?? ''
    ];
    return temp.filter(i => !!i).join(' ');
}
//# sourceMappingURL=font.js.map