'use strict'
/**
 * @author GuangHui
 * @description 基类
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Base = exports.SurrounTypeEnum = exports.HorizontalAlignEnum = exports.LayoutItemTypeEnum = void 0
var LayoutItemTypeEnum
;(function (LayoutItemTypeEnum) {
  LayoutItemTypeEnum['ROW'] = 'ROW'
  LayoutItemTypeEnum['IMG'] = 'IMG'
  LayoutItemTypeEnum['GRAPH'] = 'GRAPH'
  LayoutItemTypeEnum['GRAPH_TITLE'] = 'GRAPH_TITLE'
  LayoutItemTypeEnum['IMG_TITLE'] = 'IMG_TITLE'
  LayoutItemTypeEnum['CHAR'] = 'CHAR'
  LayoutItemTypeEnum['FORMULA'] = 'FORMULA'
  LayoutItemTypeEnum['IMG_PLACEHOLDER'] = 'IMG_PLACEHOLDER'
  LayoutItemTypeEnum['TEXT_GROUP'] = 'TEXT_GROUP'
})((LayoutItemTypeEnum = exports.LayoutItemTypeEnum || (exports.LayoutItemTypeEnum = {})))
var HorizontalAlignEnum
;(function (HorizontalAlignEnum) {
  HorizontalAlignEnum['LEFT'] = 'LEFT'
  HorizontalAlignEnum['RIGHT'] = 'RIGHT'
  HorizontalAlignEnum['MIDDLE'] = 'MIDDLE'
})((HorizontalAlignEnum = exports.HorizontalAlignEnum || (exports.HorizontalAlignEnum = {})))
var SurrounTypeEnum
;(function (SurrounTypeEnum) {
  SurrounTypeEnum['NONE'] = 'NONE'
  SurrounTypeEnum['FLOAT'] = 'FLOAT'
  SurrounTypeEnum['ABSOLUTE'] = 'ABSOLUTE'
})((SurrounTypeEnum = exports.SurrounTypeEnum || (exports.SurrounTypeEnum = {})))
class Base {
  x = -1
  y = -1
  width = -1
  height = -1
}
exports.Base = Base
//# sourceMappingURL=Base.js.map
