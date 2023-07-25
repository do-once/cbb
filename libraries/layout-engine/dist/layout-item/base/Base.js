/**
 * @author GuangHui
 * @description 基类
 */
import { uuid } from '@doonce/utils';
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
    _id = uuid();
    x = 0;
    y = 0;
    width = 0;
    height = 0;
    setPos({ x, y }) {
        x != null && (this.x = x);
        y != null && (this.y = y);
    }
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
    setSize({ width, height }) {
        width != null && (this.width = width);
        height != null && (this.height = height);
    }
}
//# sourceMappingURL=Base.js.map