/**
 * @author GuangHui
 * @description 常用类型判断
 */
/**
 * 判断是否为空（null、'',[],{},0）
 *
 * @export
 * @param {Any} obj 需要判断的对象
 * @returns {Boolean} 是否为空
 */
export declare function isEmpty(obj: any): boolean;
export declare function isArray(arr: any): boolean;
/**
 * 判断是否为类数组
 * @param {Collection} collection
 */
export declare function isArrayLike(collection: any): boolean;
export declare function isFinite(val: any): boolean;
/**
 * 判断是否为函数
 * @param {Any} fn 需要判断的对象
 */
export declare function isFunction(fn: any): boolean;
/**
 * 判断数组或对象是否为空
 * @param {Any} obj
 */
export declare function isEmptyArrOrObj(obj: any): boolean;
//# sourceMappingURL=type-judge.d.ts.map