/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */
export declare type GlobalFontOptions = {
    fontSize: number; /** 单位px */
    fontFamily: string;
    lineHeight: number; /** 单位px */
    fontStyle: string;
    fontWeight: string;
    fontVariant: string;
    source: string;
};
export declare type DoonceLayoutEngineCtrOptions = {
    globalFontOptions?: GlobalFontOptions;
};
export declare type LayoutMethodParams = {
    maxWidth: number;
    padding?: [number, number, number, number]; /** 上右下左 padding */
    letterSpacing?: number; /** 字符间距 */
};
export declare class DoonceLayoutEngine {
    globalFontOptions: GlobalFontOptions;
    font: FontFace;
    constructor({ globalFontOptions }?: DoonceLayoutEngineCtrOptions);
    private _init;
    layout(layoutParams: LayoutMethodParams): void;
    /**
     * 检查字体是否加载完成
     * 参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#fonts_that_have_loaded
     * 使用document.fonts.check()存在误检测,参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#nonexistent_fonts
     *
     * @date 2023-07-18 00:33:12
     * @returns {boolean} 是否加载
     * @memberof DoonceLayoutEngine
     */
    isFontLoaded(): boolean;
}
//# sourceMappingURL=DoonceLayoutEngine.d.ts.map