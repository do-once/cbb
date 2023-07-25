'use strict'
/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.DoonceLayoutEngine = void 0
const utils_1 = require('@doonce/utils')
const layout_item_1 = require('./layout-item')
class DoonceLayoutEngine {
  globalFontOptions
  font = null
  /** 用户传入的布局项描述列表 */
  inputLayoutItemDescList
  /** 实例化后的用户布局项列表 */
  inputLayoutItemInstanceList = []
  formulaRenderType
  debug
  constructor({ globalFontOptions, inputLayoutItemDescList, formulaRenderType, debug }) {
    if (!globalFontOptions) throw new Error('globalFontOptions is required')
    if (!inputLayoutItemDescList || !inputLayoutItemDescList.length)
      throw new Error('layoutItemDescList is required')
    this.globalFontOptions = globalFontOptions
    this.inputLayoutItemDescList = inputLayoutItemDescList
    this.formulaRenderType = formulaRenderType ?? layout_item_1.FormulaRenderTypeEnum.IMG
    this.debug = !!debug
  }
  async init() {
    /** 字体不存在,则先加载 */
    !this.font &&
      (this.font = await (0, utils_1.loadFont)(
        this.globalFontOptions.fontFamily,
        this.globalFontOptions.source
      ))
    /** 字体加载失败,阻塞流程 */
    if (!this.isFontLoaded()) throw new Error(`font ${this.globalFontOptions.fontFamily} load faild`)
    /** 实例化用户传入的布局项 */
    this.inputLayoutItemInstanceList = this.instantiateInputLayoutItemDescList()
    /** 等待实例初始化尺寸和 content结束 */
    await Promise.all(this.inputLayoutItemInstanceList.map(instance => instance.init()))
    this.debug && console.log('this.inputLayoutItemInstanceList :>> ', this.inputLayoutItemInstanceList)
  }
  instantiateInputLayoutItemDescList() {
    return this.inputLayoutItemDescList.map(({ layoutItemType, rawContent, imgSurroundType }) => {
      if (layoutItemType === layout_item_1.LayoutItemTypeEnum.FORMULA) {
        return new layout_item_1.Formula({
          rawContent,
          globalFontOptions: this.globalFontOptions,
          formulaRenderType: this.formulaRenderType
        })
      } else if (layoutItemType === layout_item_1.LayoutItemTypeEnum.GRAPH) {
        return new layout_item_1.Graph({
          src: rawContent,
          imgSurroundType: imgSurroundType ?? layout_item_1.ImgSurrounTypeEnum.NONE
        })
      } else {
        return new layout_item_1.Char({ rawContent, globalFontOptions: this.globalFontOptions })
      }
    })
  }
  layout({ maxWidth, padding = [0, 0, 0, 0], letterSpacing = 0 }) {
    if (!maxWidth) throw new Error('layoutParams is required')
    const imgOrGraphLayoutItemList = this.inputLayoutItemInstanceList.filter(
      instance =>
        [layout_item_1.LayoutItemTypeEnum.GRAPH, layout_item_1.LayoutItemTypeEnum.IMG].includes(
          instance.layoutItemType
        ) /** 此处还要考虑 img */
    )
    if (!imgOrGraphLayoutItemList || !imgOrGraphLayoutItemList.length) {
      return this.layoutWithNoneImg({
        maxWidth,
        padding,
        letterSpacing
      })
    } else {
      return this.layoutWithImg({
        imgOrGraph: imgOrGraphLayoutItemList[0] /** 暂只考虑只有一张图的场景 */,
        maxWidth,
        padding,
        letterSpacing
      })
    }
  }
  layoutWithImg({ imgOrGraph, maxWidth, padding, letterSpacing }) {
    let rowList = []
    /** 环绕 */
    if (imgOrGraph.imgSurroundType === layout_item_1.ImgSurrounTypeEnum.FLOAT) {
      /** 调试用,模拟图片位置 */
      imgOrGraph.x = 0
      imgOrGraph.y = 0
      const textLayoutItemList = this.inputLayoutItemInstanceList.filter(
        instance =>
          ![layout_item_1.LayoutItemTypeEnum.GRAPH, layout_item_1.LayoutItemTypeEnum.IMG].includes(
            instance.layoutItemType
          )
      )
      /** 首行 */
      let curRow = new layout_item_1.Row({
        globalFontOptions: this.globalFontOptions,
        rowNo: 1
      })
      curRow.x = 0
      curRow.y = 0
      curRow.width = 0
      curRow.height = this.globalFontOptions.lineHeight
      /** 记录之前行,用来计算当前行 y 坐标 */
      let prevRow = null
      for (let i = 0, curItem; i < textLayoutItemList.length; i++) {
        curItem = textLayoutItemList[i]
        /** 传入字符位置尺寸信息 同图片做碰撞检测 */
        const isCollision = (0, utils_1.checkCollision)(
          {
            width: curItem.width,
            height: curItem.height,
            x: curRow.width + curItem.x,
            y: prevRow ? prevRow.y + prevRow.height : 0 /** 首行,prevRow 为空 */
          },
          imgOrGraph
        )
        this.debug && isCollision && console.log('collision curItem is :>> ', curItem)
        /** 碰撞则添加图片占位,并更新当前行宽度 */
        if (isCollision) {
          curRow.addChild(
            new layout_item_1.ImgPlaceholder({ owner: imgOrGraph, height: this.globalFontOptions.lineHeight })
          )
          curRow.width = imgOrGraph.x + imgOrGraph.width
        }
        if (
          /** 超过容器宽度换行 */
          curRow.width + curItem.width >
          maxWidth
        ) {
          /** 加入行数组前更新当前行信息 */
          this.updateCurRowInfo(curRow, prevRow)
          /** 记录prevRow */
          prevRow = curRow
          /** 换行,将当前行塞入数组 */
          rowList.push(curRow)
          /** 创建新行 */
          curRow = new layout_item_1.Row({
            globalFontOptions: this.globalFontOptions,
            rowNo: curRow.rowNo + 1
          })
          /** 重置行宽和 x 坐标 */
          curRow.width = 0
          curRow.x = 0
          curRow.height = this.globalFontOptions.lineHeight
          /** 换行后,当前 item 的宽度大于图片左侧宽度,也需要绕开图片 */
          if (curItem.width > imgOrGraph.x) {
            curRow.addChild(
              new layout_item_1.ImgPlaceholder({
                owner: imgOrGraph,
                height: this.globalFontOptions.lineHeight
              })
            )
            curRow.width = imgOrGraph.x + imgOrGraph.width
          }
        }
        /** 更新当前 item 的 x 坐标 ,其为塞入当前 item 前的行宽 */
        curItem.x = curRow.width // TODO 可能还需要加上 letterSpacing
        /** 将当前 item 塞入当前行 */
        curRow.addChild(curItem)
        /** 更新当前行信息 */
        curRow.width += curItem.width
      }
      /** 最后行 */
      /** 加入行数组前更新当前行信息 */
      this.updateCurRowInfo(curRow, prevRow)
      /** 记录prevRow */
      prevRow = curRow
      /** 换行,将当前行塞入数组 */
      rowList.push(curRow)
    } else if (imgOrGraph.imgSurroundType === layout_item_1.ImgSurrounTypeEnum.ABSOLUTE) {
      /** 绝对定位 */
      rowList = this.layoutWithNoneImg({ maxWidth, padding, letterSpacing })
      /** 绝对定位,首次进入时,也按下挂坐标处理 */
      imgOrGraph.x = maxWidth - imgOrGraph.width
      const lastRow = rowList[rowList.length - 1]
      imgOrGraph.y = lastRow.width + imgOrGraph.width <= maxWidth ? lastRow.y : lastRow.y + lastRow.height
    } else {
      /** 默认下挂(图片渲染在题干的右下) */
      rowList = this.layoutWithNoneImg({ maxWidth, padding, letterSpacing })
      imgOrGraph.x = maxWidth - imgOrGraph.width
      const lastRow = rowList[rowList.length - 1]
      imgOrGraph.y = lastRow.width + imgOrGraph.width <= maxWidth ? lastRow.y : lastRow.y + lastRow.height
    }
    return { rowList, imgList: [imgOrGraph] }
  }
  layoutWithNoneImg({ maxWidth, padding, letterSpacing }) {
    const textLayoutItemList = this.inputLayoutItemInstanceList.filter(
      instance =>
        ![layout_item_1.LayoutItemTypeEnum.GRAPH, layout_item_1.LayoutItemTypeEnum.IMG].includes(
          instance.layoutItemType
        )
    )
    const rowList = []
    /** 首行 */
    let curRow = new layout_item_1.Row({
      globalFontOptions: this.globalFontOptions,
      rowNo: 1
    })
    curRow.x = 0
    let prevRow = null
    for (let i = 0, curItem; i < textLayoutItemList.length; i++) {
      curItem = textLayoutItemList[i]
      /** 超宽 */
      if (curRow.width + curItem.width > maxWidth) {
        /** 加入行数组前更新当前行信息 */
        this.updateCurRowInfo(curRow, prevRow)
        /** 记录prevRow */
        prevRow = curRow
        /** 换行,将当前行塞入数组 */
        rowList.push(curRow)
        /** 创建新行 */
        curRow = new layout_item_1.Row({
          globalFontOptions: this.globalFontOptions,
          rowNo: curRow.rowNo + 1
        })
        /** 重置行宽和 x 坐标 */
        curRow.width = 0
        curRow.x = 0
      }
      /** 更新当前 item 的 x 坐标 ,其为塞入当前 item 前的行宽 */
      curItem.x = curRow.width // TODO 可能还需要加上 letterSpacing
      /** 将当前 item 塞入当前行 */
      curRow.addChild(curItem)
      /** 更新当前行宽度 */
      curRow.width += curItem.width
    }
    /** 最后行 */
    this.updateCurRowInfo(curRow, prevRow)
    prevRow = curRow
    rowList.push(curRow)
    return rowList
  }
  updateCurRowInfo(curRow, prevRow) {
    /** 更新当前行行高 */
    // curRow.height = Math.max(this.globalFontOptions.lineHeight, this.getHighestRowChildHeight(curRow.childs))
    /** 计算当前行 y 坐标,其依赖上一个行高计算后才能计算 */
    curRow.y = prevRow ? prevRow.y + prevRow.height : 0
    /** 水平居中行内item */
    curRow.childs.forEach(child => {
      child.y = Math.abs(curRow.height - child.height) / 2
    })
    return curRow
  }
  /**
   * 获取最高 child 的高度
   *
   * @date 2023-07-21 16:43:37
   * @private
   * @param rowChild
   * @returns {number} 高度
   * @memberof DoonceLayoutEngine
   */
  getHighestRowChildHeight(rowChild) {
    return rowChild.reduce((acc, cur) => Math.max(cur.height, acc), 0)
  }
  /**
   * 检查字体是否加载完成
   * 参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#fonts_that_have_loaded
   * 使用document.fonts.check()存在误检测,参考:https://developer.mozilla.org/en-US/docs/Web/API/FontFaceSet/check#nonexistent_fonts
   *
   * @date 2023-07-18 00:33:12
   * @returns {boolean} 是否加载
   * @memberof DoonceLayoutEngine
   */
  isFontLoaded() {
    return this.font.status === 'loaded'
  }
}
exports.DoonceLayoutEngine = DoonceLayoutEngine
//# sourceMappingURL=DoonceLayoutEngine-backup.js.map