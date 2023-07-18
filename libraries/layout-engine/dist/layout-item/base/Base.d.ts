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
export declare enum LayoutItemTypeEnum {
    ROW = "ROW",
    IMG = "IMG",
    GRAPH = "GRAPH",
    GRAPH_TITLE = "GRAPH_TITLE",
    IMG_TITLE = "IMG_TITLE",
    CHAR = "CHAR",
    FORMULA = "FORMULA",
    IMG_PLACEHOLDER = "IMG_PLACEHOLDER",
    TEXT_GROUP = "TEXT_GROUP"
}
export interface IGroup {
    groups: Base[];
}
export interface IChild {
    childs: Base[];
}
export interface IContent {
    rawContent: string;
    content: string;
}
export interface IRow {
    rowNo: number;
    indent: number;
}
export declare enum HorizontalAlignEnum {
    LEFT = "LEFT",
    RIGHT = "RIGHT",
    MIDDLE = "MIDDLE"
}
export interface IHorizontalAlign {
    horizontalAlign: HorizontalAlignEnum;
}
export declare enum SurrounTypeEnum {
    NONE = "NONE",
    FLOAT = "FLOAT",
    ABSOLUTE = "ABSOLUTE"
}
export interface ISurround {
    surroundType: SurrounTypeEnum;
}
export declare abstract class Base implements IRect {
    x: number;
    y: number;
    width: number;
    height: number;
    abstract layoutItemType: LayoutItemTypeEnum;
    abstract canLineBreak: boolean;
    abstract getPos(): IPos | Promise<IPos>;
    abstract getSize(): ISize | Promise<ISize>;
}
//# sourceMappingURL=Base.d.ts.map