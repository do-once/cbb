/**
 * @author GuangHui
 * @description URL相关
 */
/**
 * 解析查询字符串
 * @param {String} qs 需要解析的查询字符串
 * @return {Object} 解析后的对象
 * http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled
 * 解析后:
 * {
  user: 'anonymous',
  id: [123, 456],     // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
  city: '北京',        // 中文
  enabled: true,      // 未指定值的 key 约定值为 true
  d:true
}
 */
export declare function getQueryObject(qs?: string): Record<string, unknown>;
/**
 * 从URL中解析出protocol、host
 *
 * @export
 * @param {string} url 待解析的URL
 * @returns {URLOrigin} 解析出的protocol、host对象
 */
export declare function resolveURL(url: string): {
    protocol: string;
    host: string;
};
/**
 * 判断是否同源URL
 *
 * @export
 * @param {*} requestURL 请求URL
 * @param {*} [requestURL2=window.location.href] 需要对应请求URL2，默认当前域
 * @returns
 */
export declare function isURLSameOrigin(requestURL: string, requestURL2?: string): boolean;
/**
 * 判断是否绝对路径
 *
 * @export
 * @param {string} url 待判断url
 * @returns {boolean} 是否绝对路径
 */
export declare function isAbsoluteURL(url: string): boolean;
/**
 * 拼接URL
 *
 * @export
 * @param {string} baseURL 基础URL
 * @param {string} [relativeURL] 相对URL
 * @returns {string} 完整URL
 */
export declare function combineURL(baseURL: string, relativeURL: string): string;
//# sourceMappingURL=url.d.ts.map