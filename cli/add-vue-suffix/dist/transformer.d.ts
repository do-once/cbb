/**
 * @author GuangHui
 * @description 转换
 */
import type { ParserOptions } from '@babel/parser';
import { create } from 'enhanced-resolve';
export default class Transformer {
    static MODULE_REG: RegExp;
    resolveConfig: {
        resolve?: unknown;
        mainFiles?: string[];
        [k: string]: unknown;
    };
    vueFiles: string[];
    resolver: ReturnType<typeof create.sync>;
    constructor(vueFiles?: string[], resolveConfig?: any);
    /**
     * 路径是否命中
     * @param {string} p 待检测路径
     * @returns {boolean} 是否命中
     */
    isHitted(p: string): boolean;
    transform({ code, fileDir, withAST, debug }: {
        code: string;
        fileDir: string;
        withAST: boolean;
        debug: boolean;
    }): string | undefined;
    transformWithAST(code: string, options?: ParserOptions): string;
    transformWithReg(code: string, fileDir: string, debug: boolean): string | undefined;
    normalizeTransPath(input: string, normalizedPath: string, modulePath: string, debug: boolean): string;
}
//# sourceMappingURL=transformer.d.ts.map