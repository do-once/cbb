/**
 * @author GuangHui
 * @description 基类
 */
export interface ISize {
    width: number;
    height: number;
}
export interface IPos {
    x: number;
    y: number;
}
export interface IRect extends ISize, IPos {
}
/** 布局项类型枚举 */
export declare enum LayoutItemTypeEnum {
    ROW = "ROW" /** 行 */,
    IMG = "IMG" /** 图片(图形+图形标题) */,
    GRAPH = "GRAPH" /** 图形 */,
    GRAPH_TITLE = "GRAPH_TITLE" /** 图形标题 */,
    CHAR = "CHAR" /** 单字符 */,
    FORMULA = "FORMULA" /** 公式 */,
    IMG_PLACEHOLDER = "IMG_PLACEHOLDER" /** 图片占位 */,
    TEXT_GROUP = "TEXT_GROUP" /** 文本组 */
}
export interface IChild {
    childs: Base[];
}
export interface IContent {
    rawContent: string; /** 原始内容 */
    content: string; /** 处理后的内容 */
}
export interface IRow {
    rowNo: number; /** 行号 */
    indent: number; /** 缩进 */
}
/** 水平居中枚举 */
export declare enum HorizontalAlignEnum {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    MIDDLE = "MIDDLE"
}
export interface IHorizontalAlign {
    horizontalAlign: HorizontalAlignEnum;
}
/** 图片环绕类型枚举 */
export declare enum ImgSurrounTypeEnum {
    NONE = "NONE",
    FLOAT = "FLOAT",
    ABSOLUTE = "ABSOLUTE"
}
export interface IImgSurround {
    imgSurroundType: ImgSurrounTypeEnum;
}
/**
 * 抽象基类
 *
 * @date 2023-07-18 16:30:46
 * @export
 * @abstract
 * @class Base
 */
export declare abstract class Base implements IRect {
    x: number;
    y: number;
    width: number;
    height: number;
    getPos(): IPos;
    getSize(): ISize;
    abstract layoutItemType: LayoutItemTypeEnum;
    abstract canLineBreak: boolean;
    abstract measureSize(): ISize | Promise<ISize>;
}
//# sourceMappingURL=Base.d.ts.map