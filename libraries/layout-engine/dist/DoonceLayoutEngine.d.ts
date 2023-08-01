/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */
import { Char, Formula, Row, CRLF, Img } from './layout-item';
import { RowLayoutItemGroup } from './layout-item/RowLayoutItemGroup';
/** 参考https://developer.mozilla.org/zh-CN/docs/Web/CSS/font */
export declare type GlobalFontConfig = {
    fontSize: number; /** 单位px */
    fontFamily: string;
    lineHeight: number; /** 单位px */
    fontStyle: string;
    fontWeight: string;
    fontVariant: string;
    source: string;
};
/** 限制参与行布局的实例 */
export declare type InputRowLayoutItemInstance = Char | Formula | Img | RowLayoutItemGroup | CRLF;
/** 限制参与图片布局的实例 */
export declare type InputImgLayouItemInstance = Img;
export declare type DoonceLayoutEngineCtrOptions = {
    globalFontConfig: GlobalFontConfig; /** 字体 */
    inputRowLayoutItemInstanceList: InputRowLayoutItemInstance[]; /** 用户传入的参与行布局的实例 */
    inputImgLayoutItemInstanceList: InputImgLayouItemInstance[]; /** 用户传入的参与图片布局的实例 */
    debug?: boolean;
};
/** 布局方法参数 */
export declare type LayoutMethodParams = {
    maxWidth: number; /** 单位px */
};
/** 布局方法返回值 */
export declare type LayoutMethodRet = {
    rowList: Row[];
    imgList: Img[];
};
export declare class DoonceLayoutEngine {
    globalFontConfig: GlobalFontConfig;
    font: FontFace;
    inputRowLayoutItemInstanceList: InputRowLayoutItemInstance[];
    inputImgLayoutItemInstanceList: InputImgLayouItemInstance[];
    debug: boolean;
    constructor({ globalFontConfig, inputRowLayoutItemInstanceList, inputImgLayoutItemInstanceList, debug }: DoonceLayoutEngineCtrOptions);
    init(): Promise<void>;
    /**
     * 布局
     *
     * @date 2023-08-01 10:40:15
     * @param { maxWidth } 容器宽度
     * @returns {LayoutMethodRet} 布局对象
     * @memberof DoonceLayoutEngine
     */
    layout({ maxWidth }: LayoutMethodParams): LayoutMethodRet;
    /**
     * 包含图片的图文混排方法
     *
     * @date 2023-08-01 16:57:18
     * @private
     * @param { img, maxWidth } Img实例,容器宽度
     * @returns {LayoutMethodRet} 布局对象
     * @memberof DoonceLayoutEngine
     */
    private _layoutWithImg;
    /**
     * 无图片时用的布局方法
     *
     * @date 2023-08-01 10:38:26
     * @private
     * @param { maxWidth } 最大宽度
     * @returns {LayoutMethodRet} 布局对象
     * @memberof DoonceLayoutEngine
     */
    private _layoutWithNoneImg;
    /**
     * 创建新行并设置初始尺寸和位置
     *
     * @date 2023-08-01 10:35:04
     * @private
     * @param { rowNo, prevRow } 行号,前一行实例
     * @returns {Row} 设置好初始尺寸和位置的新行
     * @memberof DoonceLayoutEngine
     */
    private _createANewRowAndSetInitialSizeAndPos;
    private _updateCurRowInfo;
    /**
     * 获取最高 child 的高度
     *
     * @date 2023-07-21 16:43:37
     * @private
     * @param rowChild
     * @returns {number} 高度
     * @memberof DoonceLayoutEngine
     */
    private getHighestRowChildHeight;
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