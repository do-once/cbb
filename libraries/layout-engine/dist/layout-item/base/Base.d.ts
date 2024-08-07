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
    GRAPH_WITH_TITLE = "GRAPH_WITH_TITLE" /** 带标题的图形 */,
    CHAR = "CHAR" /** 单字符 */,
    FORMULA = "FORMULA" /** 公式 */,
    IMG_PLACEHOLDER = "IMG_PLACEHOLDER" /** 图片占位 */,
    ROW_LAYOUT_ITEM_GROUP = "ROW_LAYOUT_ITEM_GROUP" /** 行布局item组 */,
    CRLF = "CRLF" /** 人工插入的换行 */
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
    NONE = "NONE" /** 默认下挂到题干下方 */,
    FLOAT = "FLOAT",
    ABSOLUTE = "ABSOLUTE"
}
export interface IImgSurround {
    imgSurroundType: ImgSurrounTypeEnum;
}
export interface ICache<K, V> {
    cache: Map<K, V>;
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
    _id: string;
    x: number;
    y: number;
    width: number;
    height: number;
    initialized: boolean;
    setPos({ x, y }: Partial<IPos>): void;
    getPos(): IPos;
    getSize(): ISize;
    setSize({ width, height }: Partial<ISize>): void;
    abstract layoutItemType: LayoutItemTypeEnum;
    abstract canLineBreak: boolean;
    abstract init(force: boolean): void;
    abstract measureSize(): ISize | Promise<ISize>;
}
//# sourceMappingURL=Base.d.ts.map