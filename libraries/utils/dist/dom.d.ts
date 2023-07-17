/**
 * @author GuangHui
 * @description dom 操作相关
 */
/**
 * 添加样式类
 * @param {Element} el 元素
 * @param {String} className 样式名
 */
export declare function addClass(el: HTMLElement, className: string): void;
/**
 * 移除样式类
 * @param {Element} el 元素
 * @param {String} className 样式名
 */
export declare function removeClass(el: HTMLElement, className: string): void;
/**
 * 判断是否有样式类
 * @param {Element} el 元素
 * @param {String} className 样式类
 */
export declare function hasClass(el: HTMLElement, className: string): boolean;
/**
 * 获取/设置data-*
 * @param {Element} el 元素
 * @param {String} name 名称
 * @param {Any} val 需要设置的值
 */
export declare function getData(el: HTMLElement, name: string, val: any): string | void | null;
/**
 * 获取元素尺寸
 * @param {Element} el 元素
 */
export declare function getRect(el: HTMLElement): {
    top: number;
    left: number;
    width: number;
    height: number;
};
/**
 * 复制到剪贴板
 * @param {String} str 需要复制的字符串
 */
export declare function copyToClipboard(str: string): void;
/**
 * 滚动html到顶部
 */
export declare function scrollToTop(): void;
/**
 * 获取计算样式
 * @param {Object} el
 * @returns {Object} 样式对象
 */
export declare function getStyle(el: HTMLElement): CSSStyleDeclaration;
/**
 * 添加样式
 * @param {Element} el 元素
 * @param {Object} styleObj 样式obj
 */
export declare function addStyle(el: HTMLElement, styleObj: any): void;
/**
 * 判断是否支持css3 变量
 *
 * @export
 * @returns 是否支持
 */
export declare const canSupportCssVar: {
    (): boolean;
    isSupport?: boolean;
};
/**
 * 查看某元素是否命中css选择器字符串
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches
 * https://blog.csdn.net/king_xing/article/details/50460580
 *
 * @export
 * @param {Element} el 需要检测的el
 * @param {String} selector css选择器字符串
 * @returns 是否命中
 */
export declare function matches(el: HTMLElement, selector: string): boolean;
/**
 * 检查是否支持webp格式图片
 *
 * @export
 * @returns 是否支持webp
 */
export declare function supportWebp(): boolean;
/**
 * 生成svg文本
 *
 * @export
 * @param {*} [{
 *   width = 300,
 *   height = 150,
 *   fontSize = 14,
 *   fontFamily = 'system-ui, sans-serif',
 *   color = '#a2a9b6',
 *   opacity = 1,
 *   x = 50,
 *   y = 50,
 *   content = 'svg测试文本',
 *   transform = 'rotate(0,0,0)'
 * }={}]
 * @return {String} svg字符串（未转义）
 */
export declare function genSvgText({ width, height, fontSize, fontFamily, color, opacity, x, y, content, rotate }?: {
    width?: number | undefined;
    height?: number | undefined;
    fontSize?: number | undefined;
    fontFamily?: string | undefined;
    color?: string | undefined;
    opacity?: number | undefined;
    x?: number | undefined;
    y?: number | undefined;
    content?: string | undefined;
    rotate?: number | undefined;
}): string;
/**
 * 安全转义svg字符串
 *
 * @export
 * @param {String} svg svg字符串
 * @return {String} 转移后的svg字符串
 */
export declare function escapeSvg(svg: string): string;
/**
 * 生成内联svg
 *
 * @export
 * @param {String} svg 未转义的svg字符串
 * @return {String} 转义后的内联svg字符串
 * 参考：
 * https://www.zhangxinxu.com/wordpress/2020/10/text-as-css-background-image/
 * https://www.zhangxinxu.com/wordpress/2015/10/understand-svg-transform/
 * https://www.zhangxinxu.com/wordpress/2018/08/css-svg-background-image-base64-encode/
 */
export declare function makeSvgInline(svg: string): string;
/**
 * 生成水印svg(包含默认属性)
 *
 * @export
 * @param {Object} params
 * @return {String} 转义后的内联svg字符串
 */
export declare function watermarkSvg(params?: {}): string;
/**
 * 加载css
 *
 * @export
 * @param {String} href css地址
 * @param {Object} [options={ rel: 'stylesheet' }] 额外options
 * @return {Promise}  promise实例
 */
export declare function loadCss(href: string, options?: {
    rel: string;
}): Promise<unknown>;
/**
 * 加载js
 *
 * @export
 * @param {String} src script地址
 * @param {Object} [options={ type: 'text/javascript' }] 额外options
 * @return {Promise}  promise实例
 */
export declare function loadJs(src: string, options?: {
    type: string;
}): Promise<unknown>;
//# sourceMappingURL=dom.d.ts.map