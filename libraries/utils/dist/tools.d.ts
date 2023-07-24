/**
 * @author GuangHui
 * @description 常用js工具函数
 */
/**
 * 矩形碰撞检测
 *
 * @date 2023-07-24 16:47:55
 * @export
 * @param rect1 矩形1
 * @param rect2 矩形2
 * @returns {boolean} 是否碰撞
 */
export declare function checkCollision(rect1: {
    x: number;
    y: number;
    width: number;
    height: number;
}, rect2: {
    x: number;
    y: number;
    width: number;
    height: number;
}): boolean;
/**
 * 取一个区间的随机整数
 * @param {Number} min 最小值
 * @param {Number} max 最大值
 */
export declare function getRandomInt(min: number, max: number): number;
/**
 * 随机打乱一个数组
 * @param arr
 * @returns {Array}
 */
export declare function shuffle(arr: []): never[];
/**
 * 去抖函数
 * (underscore 1.8.2实现)
 * http://www.css88.com/doc/underscore/docs/underscore.html
 * 连续触发某一事件时，只在最后一次事件触发时的wait时间后才真正执行处理函数
 * 场景：搜索建议（停止输入后再触发请求）
 * @param   {Function}  func  需要延迟的函数
 * @param   {Number}    wait  延迟时间
 * @param   {Boolean}   immediate 是否需要在第一次触发时立即执行func
 * @returns {Function}
 */
export declare function debounce(func: any, wait: number, immediate: boolean): () => unknown;
/**
 * 节流函数
 * (underscore 1.8.2实现)
 * http://www.css88.com/doc/underscore/docs/underscore.html
 * 连续触发某一事件时，会自动间隔wait时间去执行一次处理函数
 * wait时间内重复触发的事件会被忽略
 * 节流会稀释函数的执行频率
 * 场景：resize、scroll时并不需要如此密集的事件触发频率
 * @param   {Function}  func
 * @param   {Number}    wait
 * @param   {Boolean}   options
 * @returns {Function}
 */
export declare function throttle(func: any, wait: number, options: any): () => unknown;
/**
 * 实现分时的函数，在intervalTime时间间隔内执行count次fn函数
 * @param {Array}     ary       每次fn执行需要的参数数组
 * @param {Function}  fn        处理函数
 * @param {Number}    count     每个时间间隔内执行的次数
 * @param {Number}    interval  时间间隔
 */
export declare function timeChunk(ary: [], fn: any, count: number, interval: number): () => void;
/**
 * 将一个数组按size拆分成多个数组的块，然后把这些块组成新的数组
 * @author cgh
 * @time   2018-04-09
 * @param  {[type]}   array [description]
 * @param  {[type]}   size  [description]
 * @return {[type]}         [返回一个新数组]
 * @example
 *
 * chunk(['a', 'b', 'c', 'd'], 2);
 * // => [['a', 'b'], ['c', 'd']]
 *
 * chunk(['a', 'b', 'c', 'd'], 3);
 * // => [['a', 'b', 'c'], ['d']]
 */
export declare function chunk(array: [], size: number): any[];
/**
 * dateFormat unix时间戳格式化
 */
export declare function dateFormat(timestamp: number, format?: string): string;
/**
 * 判断浏览器是否支持passive模式
 *
 * @date 2021-10-26 11:37:52
 * @export
 * @return {Boolean} 是否支持passive模式
 */
export declare const eventListenerPassiveSupported: {
    (): boolean;
    isSupportPassive?: boolean;
};
/**
 * 驼峰、帕斯卡转烤串
 * @param {String} str camelCase、PascalCase字符串
 * @returns {String} kebab-case字符串
 */
export declare const str2kebab: (str: string) => string;
/**
 * 毫秒转秒
 *
 * @export
 * @param {number} ms 毫秒
 * @returns 秒
 */
export declare function ms2s(ms: number): number;
/**
 * 毫秒转分
 *
 * @export
 * @param {number} ms 毫秒
 * @returns 分
 */
export declare function ms2m(ms: number): number;
/**
 * 毫秒转小时
 *
 * @export
 * @param {number} ms 毫秒
 * @returns 小时
 */
export declare function ms2h(ms: number): number;
/**
 * 前补0
 *
 * @export
 * @param {number} num 数字
 * @returns 补零后的字符串
 */
export declare function padZero(num: number | string): string;
/**
 * 毫秒转角分符号形式
 * https://zh.wikipedia.org/wiki/角分符号
 * 分′秒″
 *
 * @export
 * @param {Number|String} num 需要转换的数字
 * @param {String} primeSymbol 角分符号；默认为′
 * @param {String} doublePrimeSymbol 角秒符号；默认为″
 * @param {Boolean} needPadZero 是否需要前补0；默认为true
 * @param {Boolean} showM 是否需要展示分；默认为true
 */
export declare function ms2PrimeSymbol({ num, primeSymbol, doublePrimeSymbol, needPadZero, showM }: {
    num: number | string;
    primeSymbol: string;
    doublePrimeSymbol: string;
    needPadZero: boolean;
    showM: boolean;
}): string;
/**
 * 毫秒转换为 时'分"秒 形式
 * @param {Number|String} num 需要转换的数字
 * @param {String} sep 主要分隔符；默认为'
 * @param {String} subSep 次要分隔符；默认为"
 * @param {Boolean} needPadZero 是否需要前补0；默认为true
 * @param {Boolean} showH 是否需要展示时；默认为true
 * @param {Boolean} showM 是否需要展示分；默认为true
 */
export declare function ms2hms({ num, sep, subSep, needPadZero, showH, showM }: {
    num: number | string;
    sep: string;
    subSep: string;
    needPadZero: boolean;
    showH: boolean;
    showM: boolean;
}): string | number;
/**
 * 保留位数
 *
 * @export
 * @param {*} originalNum 原始值
 * @param {number} [keepCount=1] 保留的位数，默认1
 * @param {boolean} [round=true] 四舍五入，默认为true，否则直接截取
 * @param {boolean} [keepNegativeZero=false] 是否保留负零，默认为false，不保留
 * @returns {string} 调整后的数字字符串
 */
export declare function fixedDecimal(originalNum: number | string, keepCount?: number, round?: boolean, keepNegativeZero?: boolean): string | number;
/**
 * 数字转百分比
 * @param {Number|String} originalNum 需要转换的数字
 */
export declare function num2percentage(originalNum: number | string): string | number;
declare type NestedArray<T> = Array<NestedArray<T> | T>;
/**
 * 扁平化
 *
 * @date 2023-02-10 17:07:41
 * @export
 * @template T 类型
 * @param arr 待转换数组
 * @returns {Array} 转换后数组
 */
export declare function flatten<T>(arr: T[][]): T[];
/**
 * 数组深度扁平化
 * @param {Array} arr 待转换数组
 */
export declare function flattenDeep<T>(arr: NestedArray<T>): T[];
/**
 * 替换emoji
 * @param {String} str 原始字符串
 * @param {String} placeholder 替换字符
 */
export declare const replaceEmoji: (str: string, placeholder?: string) => string;
/**
 * 从url中获取图片的流
 * @param {String} url 图片url
 */
export declare function getImgURLBlob(url: string): Promise<unknown>;
/**
 * 生成唯一id uuid v4版本
 * UUID也是需要像身份证号一样事先制定一些简单的规则进去的，它的标准型式包含32个16进制数字，以连字号分为五段，表现形式为8-4-4-4-12的32个字符，如下所示
 * xxxxxxxx-xxxx-Mxxx-Nxxx-xxxxxxxxxxxx
 * 其中M与N都有特殊含义，M表示UUID版本，目前只有五个版本，即只会出现1，2，3，4，5，数字 N的一至三个最高有效位表示 UUID 变体，目前只会出现8，9，a，b四种情况。
 */
export declare function uuid(): string;
/**
 * 获取origin
 * origin = protocol + // + host
 * host = hostname + port
 *
 * @export
 * @returns origin字符串
 * 例子:返回 https://xxx.abc.com:456
 */
export declare function getOrigin(): string;
/**
 * 返回全局上下文
 */
export declare function getGlobalThis(): any;
/**
 * 千分位处理
 * 1000.123 -> 1,000.123
 */
export declare const thousands: (num: number) => string;
declare type ReturnAPromise<T> = () => Promise<T>;
declare type PromiseOrReturnAPromise<T> = Promise<T> | ReturnAPromise<T>;
/**
 * 超时取消单个、多个promise执行
 *
 * @export
 * @param {Number} timeout 超时时间，单位毫秒
 * @param {String} [msg='timeout'] 超时提示
 * @param {Promise|Array<Promise>} promises promise实例数组
 * @return {Promise} 一个超时自动取消的promise实例
 */
export declare function makePromiseTimeoutAutoCancel(oneOrMorePromise: PromiseOrReturnAPromise<unknown> | PromiseOrReturnAPromise<unknown>[], timeout: number, msg?: string): () => Promise<unknown>;
export {};
//# sourceMappingURL=tools.d.ts.map