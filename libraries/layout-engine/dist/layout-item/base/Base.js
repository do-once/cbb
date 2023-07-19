/**
 * @author GuangHui
 * @description 基类
 */
/** 布局项类型枚举 */
export var LayoutItemTypeEnum;
(function (LayoutItemTypeEnum) {
    LayoutItemTypeEnum["ROW"] = "ROW"; /** 行 */
    LayoutItemTypeEnum["IMG"] = "IMG"; /** 图片(图形+图形标题) */
    LayoutItemTypeEnum["GRAPH"] = "GRAPH"; /** 图形 */
    LayoutItemTypeEnum["GRAPH_TITLE"] = "GRAPH_TITLE"; /** 图形标题 */
    LayoutItemTypeEnum["CHAR"] = "CHAR"; /** 单字符 */
    LayoutItemTypeEnum["FORMULA"] = "FORMULA"; /** 公式 */
    LayoutItemTypeEnum["IMG_PLACEHOLDER"] = "IMG_PLACEHOLDER"; /** 图片占位 */
    LayoutItemTypeEnum["TEXT_GROUP"] = "TEXT_GROUP"; /** 文本组 */
})(LayoutItemTypeEnum || (LayoutItemTypeEnum = {}));
/** 水平居中枚举 */
export var HorizontalAlignEnum;
(function (HorizontalAlignEnum) {
    HorizontalAlignEnum["LEFT"] = "LEFT";
    HorizontalAlignEnum["RIGHT"] = "RIGHT";
    HorizontalAlignEnum["MIDDLE"] = "MIDDLE";
})(HorizontalAlignEnum || (HorizontalAlignEnum = {}));
/** 图片环绕类型枚举 */
export var ImgSurrounTypeEnum;
(function (ImgSurrounTypeEnum) {
    ImgSurrounTypeEnum["NONE"] = "NONE";
    ImgSurrounTypeEnum["FLOAT"] = "FLOAT";
    ImgSurrounTypeEnum["ABSOLUTE"] = "ABSOLUTE";
})(ImgSurrounTypeEnum || (ImgSurrounTypeEnum = {}));
/**
 * 抽象基类
 *
 * @date 2023-07-18 16:30:46
 * @export
 * @abstract
 * @class Base
 */
export class Base {
    x = -1;
    y = -1;
    width = -1;
    height = -1;
    getPos() {
        return {
            x: this.x,
            y: this.y
        };
    }
    getSize() {
        return {
            width: this.width,
            height: this.height
        };
    }
}
//# sourceMappingURL=Base.js.map