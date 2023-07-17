/**
 * @author GuangHui
 * @description 文件相关类型转换函数
 */
/**
 * dataURL(base64)转Blob
 *
 * @export Blob
 * @param {String} dataurl dataURL字符串
 * @returns Blob
 */
export declare function dataURL2Blob(dataurl: string): Blob;
/**
 * dataURL(base64)转File
 *
 * @export File
 * @param {String} dataurl
 * @param {String} filename
 * @returns File
 */
export declare function dataURL2File(dataurl: string, filename: string): File;
/**
 * blob、file转 dataURL(base64)
 *
 * @export base64
 * @param {Blob|File} blobOrFile
 * @returns dataURL
 */
export declare function blob2DataURL(blobOrFile: Blob): Promise<unknown>;
/**
 * file转Blob
 *
 * @export
 * @param {File} file file对象
 * @returns
 */
export declare function file2Blob(file: Blob): Promise<unknown>;
/**
 * blob转File
 *
 * @export File
 * @param {Blob} blob blob
 * @param {String} name filename
 * @returns
 */
export declare function blob2File(blob: Blob, name: string): Blob;
/**
 * blob、file 转ObjectURL
 *
 * @export ObjectURL
 * @param {Blob|File} blobOrFile
 * @returns ObjectURL
 */
export declare function blob2ObjectURL(blobOrFile: Blob): string | Error;
/**
 * string -> base64
 * btoa从二进制数据“字符串”创建一个base-64编码的ASCII字符串
 * 实现参考
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/Base64_encoding_and_decoding
 * https://developer.mozilla.org/zh-CN/docs/Web/API/WindowBase64/btoa#Unicode_%E5%AD%97%E7%AC%A6%E4%B8%B2
 *
 * @export
 * @param {String} s 需要编码的字符串
 * @returns
 */
export declare function _btoa(s: string): string | undefined;
/**
 * base64 -> string
 * atob能够解码通过base-64编码的字符串数据
 *
 * @export
 * @param {String} s 需要解码的base64字符串
 * @returns
 */
export declare function _atob(s: string): string | undefined;
//# sourceMappingURL=file-convert.d.ts.map