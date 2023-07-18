/**
 * @author GuangHui
 * @description 字体相关
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
export declare function loadFont(family: string, source: string | BinaryData, descriptors?: FontFaceDescriptors): Promise<FontFace>;
/**
 * 测量字符宽度
 *
 * @date 2023-07-17 23:51:16
 * @export
 * @param text 待测量字符
 * @param cssFontDescStr 和 cssFont 规范一样的字体描述字符串,参考https://developer.mozilla.org/zh-CN/docs/Web/CSS/font
 * 必须包含以下值：
 * <font-size><font-family>
 * 可以选择性包含以下值：
 * <font-style><font-variant><font-weight><line-height>
 * font-style, font-variant 和 font-weight 必须在 font-size 之前
 * 在 CSS 2.1 中 font-variant 只可以是 normal 和 small-caps
 * line-height 必须跟在 font-size 后面，由 "/" 分隔，例如 "16px/3"
 * font-family 必须最后指定
 * @example cssFontStr -> "italic normal bold 16px/20px SimSun"
 * @returns {TextMetrics} canvas文本尺寸对象
 */
export declare function measureTextMetrics(text: string, cssFontDescStr: string): TextMetrics;
export declare type FontDesc = {
    fontSize: number | string;
    fontFamily: string;
    lineHeight?: number | string;
    fontStyle?: string;
    fontWeight?: string | number;
    fontVariant?: string;
};
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
export declare function getCssFontDesc({ fontSize, fontFamily, fontStyle, fontWeight, lineHeight, fontVariant }: FontDesc): string;
//# sourceMappingURL=font.d.ts.map