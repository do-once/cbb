/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */

import { loadFont } from '@doonce/utils'
import {
  Char,
  Formula,
  FormulaRenderTypeEnum,
  Graph,
  Img,
  ImgSurrounTypeEnum,
  LayoutItemTypeEnum,
  Row,
  RowChild
} from './layout-item'

export type GlobalFontOptions = {
  fontSize: number /** 单位px */
  fontFamily: string
  lineHeight: number /** 单位px */
  fontStyle: string
  fontWeight: string
  fontVariant: string
  source: string
}

export type InputLayoutItemDesc = {
  layoutItemType: LayoutItemTypeEnum.CHAR | LayoutItemTypeEnum.FORMULA | LayoutItemTypeEnum.GRAPH
  // | LayoutItemTypeEnum.TEXT_GROUP // ? 后期考虑
  rawContent: string
  imgSurroundType?: ImgSurrounTypeEnum
}

export type DoonceLayoutEngineCtrOptions = {
  globalFontOptions: GlobalFontOptions /** 字体 */
  inputLayoutItemDescList: InputLayoutItemDesc[] /** 用户传入的布局项描述对象列表 */
  formulaRenderType: FormulaRenderTypeEnum /** 公式渲染类型 */
}

export type LayoutMethodParams = {
  maxWidth: number /** 单位px */
  padding?: [number, number, number, number] /** 上右下左 padding */
  letterSpacing?: number /** 字符间距 */
}

export class DoonceLayoutEngine {
  globalFontOptions: GlobalFontOptions
  font: FontFace = null as unknown as FontFace

  /** 用户传入的布局项描述列表 */
  inputLayoutItemDescList: InputLayoutItemDesc[]
  /** 实例化后的用户布局项列表 */
  inputLayoutItemInstanceList: (Char | Formula | Graph)[] = []

  formulaRenderType: FormulaRenderTypeEnum

  constructor({
    globalFontOptions,
    inputLayoutItemDescList,
    formulaRenderType
  }: DoonceLayoutEngineCtrOptions) {
    if (!globalFontOptions) throw new Error('globalFontOptions is required')
    if (!inputLayoutItemDescList || !inputLayoutItemDescList.length)
      throw new Error('layoutItemDescList is required')

    this.globalFontOptions = globalFontOptions
    this.inputLayoutItemDescList = inputLayoutItemDescList
    this.formulaRenderType = formulaRenderType ?? FormulaRenderTypeEnum.IMG
  }

  async init() {
    /** 字体不存在,则先加载 */
    !this.font &&
      (this.font = await loadFont(this.globalFontOptions.fontFamily, this.globalFontOptions.source))

    /** 字体加载失败,阻塞流程 */
    if (!this.isFontLoaded()) throw new Error(`font ${this.globalFontOptions.fontFamily} load faild`)

    /** 实例化用户传入的布局项 */
    this.inputLayoutItemInstanceList = this.instantiateInputLayoutItemDescList()

    /** 等待实例初始化尺寸和 content结束 */
    await Promise.all(this.inputLayoutItemInstanceList.map(instance => instance.init()))

    console.log('this.inputLayoutItemInstanceList :>> ', this.inputLayoutItemInstanceList)
  }

  private instantiateInputLayoutItemDescList() {
    return this.inputLayoutItemDescList.map(({ layoutItemType, rawContent, imgSurroundType }) => {
      if (layoutItemType === LayoutItemTypeEnum.FORMULA) {
        return new Formula({
          rawContent,
          globalFontOptions: this.globalFontOptions,
          formulaRenderType: this.formulaRenderType
        })
      } else if (layoutItemType === LayoutItemTypeEnum.GRAPH) {
        return new Graph({ src: rawContent, imgSurroundType: imgSurroundType ?? ImgSurrounTypeEnum.NONE })
      } else {
        return new Char({ rawContent, globalFontOptions: this.globalFontOptions })
      }
    })
  }

  public layout({ maxWidth, padding = [0, 0, 0, 0], letterSpacing = 0 }: LayoutMethodParams) {
    if (!maxWidth) throw new Error('layoutParams is required')

    const imgOrGraphLayoutItemList = this.inputLayoutItemInstanceList.filter(
      (instance): instance is Graph =>
        [LayoutItemTypeEnum.GRAPH, LayoutItemTypeEnum.IMG].includes(
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

  private layoutWithImg({
    imgOrGraph,
    maxWidth,
    padding,
    letterSpacing
  }: { imgOrGraph: Img | Graph } & LayoutMethodParams) {}

  private layoutWithNoneImg({ maxWidth, padding, letterSpacing }: LayoutMethodParams) {
    const textLayoutItemList = this.inputLayoutItemInstanceList.filter(
      (instance): instance is Char | Formula =>
        ![LayoutItemTypeEnum.GRAPH, LayoutItemTypeEnum.IMG].includes(instance.layoutItemType)
    )

    const rowList: Row[] = []

    /** 首行 */
    let curRow = new Row({
      globalFontOptions: this.globalFontOptions,
      rowNo: 1
      // indent: 2 * this.globalFontOptions.fontSize /** 首行缩进2个字符宽度 */
    })
    curRow.x = 0
    curRow.width = curRow.indent /** 留出缩进距离 */

    for (let i = 0, curItem: Char | Formula; i < textLayoutItemList.length; i++) {
      curItem = textLayoutItemList[i]

      /** 超宽 */
      if (curRow.width + curItem.width > maxWidth) {
        /** 换行,将当前行塞入数组 */
        rowList.push(curRow)

        /** 创建新行 */
        curRow = new Row({
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
      /** 更新当前行信息 */
      curRow.width += curItem.width
    }

    /** 最后行 */
    rowList.push(curRow)

    /** 更新行高 & 行 y 坐标 */
    rowList.forEach((row, index, arr) => {
      row.height = Math.max(this.globalFontOptions.lineHeight, this.getHighestRowChildHeight(row.childs))

      /** 行 y 坐标依赖上一个行的高度计算后才能计算 */
      if (row.rowNo === 1) {
        row.y = 0
      } else {
        const prevRow = arr[index - 1]
        row.y = prevRow.y + prevRow.height
      }
    })

    /** 水平居中行内item */
    rowList.forEach(row => {
      row.childs.forEach(c => {
        c.y = (row.height - c.height) / 2
      })
    })

    return rowList
  }

  getHighestRowChildHeight(rowChild: RowChild[]) {
    let height = 0
    rowChild.forEach(row => {
      if (row.height > height) {
        height = row.height
      }
    })

    return height
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
  public isFontLoaded() {
    return this.font.status === 'loaded'
  }
}
