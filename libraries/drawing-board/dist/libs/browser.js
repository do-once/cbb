/**
 * @author GuangHui
 * @description 浏览器判断
 */
export const inBrowser = typeof window !== 'undefined';
export const UA = inBrowser ? window.navigator.userAgent.toLowerCase() : '';
export const isIE = UA ? /msie|trident/.test(UA) : false;
//# sourceMappingURL=browser.js.map