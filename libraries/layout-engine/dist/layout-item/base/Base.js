/**
 * @author GuangHui
 * @description 基类
 */
export var LayoutItemTypeEnum;
(function (LayoutItemTypeEnum) {
    LayoutItemTypeEnum["ROW"] = "ROW";
    LayoutItemTypeEnum["IMG"] = "IMG";
    LayoutItemTypeEnum["GRAPH"] = "GRAPH";
    LayoutItemTypeEnum["GRAPH_TITLE"] = "GRAPH_TITLE";
    LayoutItemTypeEnum["IMG_TITLE"] = "IMG_TITLE";
    LayoutItemTypeEnum["CHAR"] = "CHAR";
    LayoutItemTypeEnum["FORMULA"] = "FORMULA";
    LayoutItemTypeEnum["IMG_PLACEHOLDER"] = "IMG_PLACEHOLDER";
    LayoutItemTypeEnum["TEXT_GROUP"] = "TEXT_GROUP";
})(LayoutItemTypeEnum || (LayoutItemTypeEnum = {}));
export var HorizontalAlignEnum;
(function (HorizontalAlignEnum) {
    HorizontalAlignEnum["LEFT"] = "LEFT";
    HorizontalAlignEnum["RIGHT"] = "RIGHT";
    HorizontalAlignEnum["MIDDLE"] = "MIDDLE";
})(HorizontalAlignEnum || (HorizontalAlignEnum = {}));
export var SurrounTypeEnum;
(function (SurrounTypeEnum) {
    SurrounTypeEnum["NONE"] = "NONE";
    SurrounTypeEnum["FLOAT"] = "FLOAT";
    SurrounTypeEnum["ABSOLUTE"] = "ABSOLUTE";
})(SurrounTypeEnum || (SurrounTypeEnum = {}));
export class Base {
    x = -1;
    y = -1;
    width = -1;
    height = -1;
}
//# sourceMappingURL=Base.js.map