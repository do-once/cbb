## API Report File for "@doonce/layout-engine"

> Do not edit this file. It is a report generated by [API Extractor](https://api-extractor.com/).

```ts

import { TransformLatexToSVGStrAndDataUrlRet } from '@doonce/latex-svg-dataurl';

// @public
export abstract class Base implements IRect {
    // (undocumented)
    abstract canLineBreak: boolean;
    // (undocumented)
    getPos(): IPos;
    // (undocumented)
    getSize(): ISize;
    // (undocumented)
    height: number;
    // (undocumented)
    _id: string;
    // (undocumented)
    abstract init(force: boolean): void;
    // (undocumented)
    initialized: boolean;
    // (undocumented)
    abstract layoutItemType: LayoutItemTypeEnum;
    // (undocumented)
    abstract measureSize(): ISize | Promise<ISize>;
    // (undocumented)
    setPos({ x, y }: Partial<IPos>): void;
    // (undocumented)
    setSize({ width, height }: Partial<ISize>): void;
    // (undocumented)
    width: number;
    // (undocumented)
    x: number;
    // (undocumented)
    y: number;
}

// @public (undocumented)
export class Char extends Base implements IContent, IRow {
    constructor({ rawContent, globalFontConfig, debug, rowNo }: CharCtrOptions);
    // (undocumented)
    canLineBreak: boolean;
    // (undocumented)
    content: IContent['content'];
    // (undocumented)
    debug: boolean;
    // (undocumented)
    globalFontConfig: GlobalFontConfig;
    // (undocumented)
    init(force?: boolean): Promise<void>;
    // (undocumented)
    layoutItemType: LayoutItemTypeEnum;
    // (undocumented)
    measureSize(): ISize;
    // (undocumented)
    rawContent: IContent['rawContent'];
    // (undocumented)
    rowNo: IRow['rowNo'];
}

// @public (undocumented)
export type CharCtrOptions = {
    rawContent: IContent['rawContent']; /** 原始内容 */
    globalFontConfig: GlobalFontConfig; /** 字体设置项 */
    debug?: boolean; /** 调试 */
    rowNo: IRow['rowNo'];
};

// @public (undocumented)
export class CRLF extends Base implements IRow {
    constructor({ debug, because, rowNo }: CRLFCtrOptions);
    // (undocumented)
    because: string;
    // (undocumented)
    canLineBreak: boolean;
    // (undocumented)
    debug: boolean;
    // (undocumented)
    init(force?: boolean): Promise<void>;
    // (undocumented)
    layoutItemType: LayoutItemTypeEnum;
    // (undocumented)
    measureSize(): ISize;
    // (undocumented)
    rowNo: IRow['rowNo'];
}

// @public (undocumented)
export type CRLFCtrOptions = {
    debug?: boolean;
    because: string; /** 手动换行原因 */
    rowNo: IRow['rowNo'];
};

// @public (undocumented)
export class DoonceLayoutEngine {
    constructor({ globalFontConfig, inputRowLayoutItemInstanceList, inputImgLayoutItemInstanceList, debug }: DoonceLayoutEngineCtrOptions);
    // (undocumented)
    debug: boolean;
    // (undocumented)
    font: FontFace;
    // (undocumented)
    globalFontConfig: GlobalFontConfig;
    // (undocumented)
    init(): Promise<void>;
    // (undocumented)
    inputImgLayoutItemInstanceList: InputImgLayouItemInstance[];
    // (undocumented)
    inputRowLayoutItemInstanceList: InputRowLayoutItemInstance[];
    isFontLoaded(): boolean;
    layout({ maxWidth }: LayoutMethodParams): LayoutMethodRet;
}

// @public (undocumented)
export type DoonceLayoutEngineCtrOptions = {
    globalFontConfig: GlobalFontConfig; /** 字体 */
    inputRowLayoutItemInstanceList: InputRowLayoutItemInstance[]; /** 用户传入的参与行布局的实例 */
    inputImgLayoutItemInstanceList: InputImgLayouItemInstance[]; /** 用户传入的参与图片布局的实例 */
    debug?: boolean;
};

// @public (undocumented)
export class Formula extends Base implements IContent, IRow {
    constructor({ rawContent, globalFontConfig, formulaRenderType, debug, rowNo }: FormulaCtrOptions);
    // (undocumented)
    canLineBreak: boolean;
    // (undocumented)
    content: IContent['content'];
    // (undocumented)
    debug: boolean;
    formulaRenderType: FormulaRenderTypeEnum;
    // (undocumented)
    getSvgStrAndDataUrl(): Promise<TransformLatexToSVGStrAndDataUrlRet>;
    // (undocumented)
    globalFontConfig: GlobalFontConfig;
    // (undocumented)
    init(force?: boolean): Promise<void>;
    // (undocumented)
    layoutItemType: LayoutItemTypeEnum;
    // (undocumented)
    measureSize(): Promise<ISize>;
    // (undocumented)
    measureSizeWithSvgDataUrl(svgDataUrl: string): Promise<ISize>;
    // (undocumented)
    measureSizeWithSvgEl(svgEl: SVGSVGElement, globalFontConfig: GlobalFontConfig): ISize;
    // (undocumented)
    parse2SvgEl(svgStr: string): SVGSVGElement | null;
    // (undocumented)
    rawContent: IContent['rawContent'];
    // (undocumented)
    rowNo: IRow['rowNo'];
    // (undocumented)
    svgEl: SVGSVGElement;
}

// @public (undocumented)
export type FormulaCtrOptions = {
    rawContent: string; /** 公式原始内容 */
    globalFontConfig: GlobalFontConfig; /** 字体设置项 */
    formulaRenderType: FormulaRenderTypeEnum; /** 公式渲染类型,SVG(dom 节点) 或 IMG */
    debug?: boolean; /** 调试 */
    rowNo: IRow['rowNo'];
};

// @public (undocumented)
export enum FormulaRenderTypeEnum {
    // (undocumented)
    IMG = "IMG",
    // (undocumented)
    SVG = "SVG"
}

// @public
export type GlobalFontConfig = {
    fontSize: number; /** 单位px */
    fontFamily: string;
    lineHeight: number; /** 单位px */
    fontStyle: string;
    fontWeight: string;
    fontVariant: string;
    source: string;
};

// @public
export enum HorizontalAlignEnum {
    // (undocumented)
    LEFT = "LEFT",
    // (undocumented)
    MIDDLE = "MIDDLE",
    // (undocumented)
    RIGHT = "RIGHT"
}

// @public (undocumented)
export interface ICache<K, V> {
    // (undocumented)
    cache: Map<K, V>;
}

// @public (undocumented)
export interface IChild {
    // (undocumented)
    childs: Base[];
}

// @public (undocumented)
export interface IContent {
    // (undocumented)
    content: string; /** 原始内容 */
    // (undocumented)
    rawContent: string; /** 处理后的内容 */
}

// @public (undocumented)
export interface IHorizontalAlign {
    // (undocumented)
    horizontalAlign: HorizontalAlignEnum;
}

// @public (undocumented)
export interface IImgSurround {
    // (undocumented)
    imgSurroundType: ImgSurrounTypeEnum;
}

// @public (undocumented)
export class Img extends Base implements IContent, IRow {
    constructor({ title, globalFontConfig, imgSurroundType, rawContent, rowNo }: ImgCtrOptions);
    // (undocumented)
    canLineBreak: boolean;
    // (undocumented)
    content: IContent['content'];
    // (undocumented)
    globalFontConfig: GlobalFontConfig;
    // (undocumented)
    imgSurroundType: ImgSurrounTypeEnum;
    // (undocumented)
    init(force?: boolean): Promise<void>;
    // (undocumented)
    layoutItemType: LayoutItemTypeEnum;
    // (undocumented)
    measureSize(): Promise<ISize>;
    // (undocumented)
    measureTitleSize(): {
        width: number;
        height: number;
    };
    // (undocumented)
    rawContent: IContent['rawContent'];
    // (undocumented)
    rowNo: IRow['rowNo'];
    // (undocumented)
    title: string;
}

// @public (undocumented)
export type ImgCtrOptions = {
    title?: string;
    rowNo: IRow['rowNo'];
    rawContent: IContent['rawContent'];
    globalFontConfig: GlobalFontConfig;
    imgSurroundType: ImgSurrounTypeEnum;
};

// @public (undocumented)
export class ImgPlaceholder extends Base implements IContent, IRow {
    constructor({ ownerImg, height, rowNo, y }: ImgPlaceholderCtrOptions);
    // (undocumented)
    canLineBreak: boolean;
    // (undocumented)
    content: IContent['content'];
    // (undocumented)
    height: number;
    // (undocumented)
    init(force?: boolean): void;
    // (undocumented)
    layoutItemType: LayoutItemTypeEnum;
    // (undocumented)
    measureSize(): ISize;
    // (undocumented)
    ownerImg: Owner;
    // (undocumented)
    rawContent: IContent['rawContent'];
    // (undocumented)
    rowNo: IRow['rowNo'];
}

// @public (undocumented)
export type ImgPlaceholderCtrOptions = {
    ownerImg: Owner;
    height: number;
    y: number;
    rowNo: IRow['rowNo'];
};

// @public
export enum ImgSurrounTypeEnum {
    // (undocumented)
    ABSOLUTE = "ABSOLUTE" /** 默认下挂到题干下方 */,
    // (undocumented)
    FLOAT = "FLOAT" /** 默认下挂到题干下方 */,
    // (undocumented)
    NONE = "NONE"
}

// @public
export type InputImgLayouItemInstance = Img;

// Warning: (ae-forgotten-export) The symbol "RowLayoutItemGroup" needs to be exported by the entry point index.d.ts
//
// @public
export type InputRowLayoutItemInstance = Char | Formula | Img | RowLayoutItemGroup | CRLF;

// @public (undocumented)
export interface IPos {
    // (undocumented)
    x: number;
    // (undocumented)
    y: number;
}

// @public (undocumented)
export interface IRect extends ISize, IPos {
}

// @public (undocumented)
export interface IRow {
    // (undocumented)
    rowNo: number; /** 行号 */
}

// @public
export interface ISize {
    // (undocumented)
    height: number;
    // (undocumented)
    width: number;
}

// @public
export enum LayoutItemTypeEnum {
    // (undocumented)
    CHAR = "CHAR" /** 行 */,
    // (undocumented)
    CRLF = "CRLF" /** 行 */,
    // (undocumented)
    FORMULA = "FORMULA" /** 行 */,
    // (undocumented)
    GRAPH = "GRAPH" /** 行 */,
    // (undocumented)
    GRAPH_WITH_TITLE = "GRAPH_WITH_TITLE" /** 行 */,
    // (undocumented)
    IMG = "IMG" /** 行 */,
    // (undocumented)
    IMG_PLACEHOLDER = "IMG_PLACEHOLDER" /** 行 */,
    // (undocumented)
    ROW = "ROW" /** 行 */,
    // (undocumented)
    ROW_LAYOUT_ITEM_GROUP = "ROW_LAYOUT_ITEM_GROUP" /** 人工插入的换行 */
}

// @public
export type LayoutMethodParams = {
    maxWidth: number; /** 单位px */
};

// @public
export type LayoutMethodRet = {
    rowList: Row[];
    imgList: Img[];
};

// @public
export type Owner = Img;

// @public (undocumented)
export class Row extends Base implements IRow, IChild {
    constructor({ globalFontConfig, rowNo }: RowCtrOptions);
    // (undocumented)
    addChild(child: RowChild): void;
    // (undocumented)
    canLineBreak: boolean;
    // (undocumented)
    childs: RowChild[];
    // (undocumented)
    globalFontConfig: GlobalFontConfig;
    // (undocumented)
    init(force: boolean): void;
    // (undocumented)
    layoutItemType: LayoutItemTypeEnum;
    // (undocumented)
    measureSize(): ISize;
    // (undocumented)
    rowNo: IRow['rowNo'];
}

// @public
export type RowChild = Char | Formula | ImgPlaceholder | RowLayoutItemGroup | CRLF | Img;

// @public (undocumented)
export type RowCtrOptions = {
    globalFontConfig: GlobalFontConfig;
    rowNo: IRow['rowNo'];
};

// (No @packageDocumentation comment for this package)

```
