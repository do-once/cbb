/**
 * @author GuangHui
 * @description 浏览器判断
 */
export declare const inBrowser: boolean;
export declare const isIE: boolean | "";
export declare const isIE9: boolean | "";
export declare const isEdge: boolean | "";
export declare const isAndroid: boolean | "";
export declare const isIOS: boolean | "";
export declare const isChrome: boolean | "";
export declare const isPhantomJS: boolean | "";
export declare const isFF: false | "" | RegExpMatchArray | null;
/**
 * 使用noopener打开一个新标签页
 * https://juejin.im/post/5ecfc6b5f265da76d53c0c91
 */
export declare function openInNewTabWithoutOpener(href: string): void;
/**
 * 旧版本的Safari中,使用noopener打开一个新标签页
 * https://juejin.im/post/5ecfc6b5f265da76d53c0c91
 */
export declare function openInNewTabWithNoopenerInSafari(href: string): void;
//# sourceMappingURL=browser.d.ts.map