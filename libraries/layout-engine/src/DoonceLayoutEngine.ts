/**
 * @author GuangHui
 * @description DoonceLayoutEngine 主体程序
 */

import { loadFont, checkCollision } from '@doonce/utils'
import {
  Char,
  Formula,
  FormulaRenderTypeEnum,
  Graph,
  Img,
  ImgPlaceholder,
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
  debug?: boolean
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

  debug: boolean

  constructor({
    globalFontOptions,
    inputLayoutItemDescList,
    formulaRenderType,
    debug
  }: DoonceLayoutEngineCtrOptions) {
    if (!globalFontOptions) throw new Error('globalFontOptions is required')
    if (!inputLayoutItemDescList || !inputLayoutItemDescList.length)
      throw new Error('layoutItemDescList is required')

    this.globalFontOptions = globalFontOptions
    this.inputLayoutItemDescList = inputLayoutItemDescList
    this.formulaRenderType = formulaRenderType ?? FormulaRenderTypeEnum.IMG
    this.debug = !!debug
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

    this.debug && console.log('this.inputLayoutItemInstanceList :>> ', this.inputLayoutItemInstanceList)
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

    const imgOrGraphLayoutItemList = this.inputLayoutItemInstanceList.filter((instance): instance is Graph =>
      /** 此处声明需优化 */
      [LayoutItemTypeEnum.GRAPH, LayoutItemTypeEnum.IMG].includes(instance.layoutItemType)
    )

    /** 存在图片 */
    if (imgOrGraphLayoutItemList && imgOrGraphLayoutItemList.length) {
      return this.layoutWithImg({
        imgOrGraph: imgOrGraphLayoutItemList[0] /** 暂只考虑只有一张图的场景 */,
        maxWidth,
        padding,
        letterSpacing
      })
    } else {
      return this.layoutWithNoneImg({
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
  }: { imgOrGraph: Img | Graph } & LayoutMethodParams): {
    rowList: Row[]
    imgList: (Graph | Img)[]
  } {
    let rowList: Row[] = []

    /** 环绕 */
    if (imgOrGraph.imgSurroundType === ImgSurrounTypeEnum.FLOAT) {
      /** 调试用,模拟图片位置 */
      // imgOrGraph.x = 157
      // imgOrGraph.y = 18

      const textLayoutItemList = this.inputLayoutItemInstanceList.filter(
        (instance): instance is Char | Formula =>
          [LayoutItemTypeEnum.CHAR, LayoutItemTypeEnum.FORMULA].includes(instance.layoutItemType)
      )

      /** 首行 */
      let curRow = new Row({
        globalFontOptions: this.globalFontOptions,
        rowNo: 1
      })
      /** 所有行全部按固定行高计算 */
      curRow.setSize({ width: 0, height: this.globalFontOptions.lineHeight })
      curRow.setPos({ x: 0, y: 0 })

      /** 记录之前行,用来计算当前行 y 坐标 */
      let prevRow: Row | null = null

      for (let i = 0, curItem: Char | Formula; i < textLayoutItemList.length; i++) {
        curItem = textLayoutItemList[i]

        /** 传入字符位置尺寸信息 同图片做碰撞检测 */
        const isCollision = checkCollision(
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
            new ImgPlaceholder({ owner: imgOrGraph, height: this.globalFontOptions.lineHeight })
          )
          /** 宽度到图片右侧 */
          curRow.setSize({ width: imgOrGraph.x + imgOrGraph.width })
        }

        /** 超宽,需要将 curItem 放在下行 */
        if (curRow.width + curItem.width > maxWidth) {
          let rowNo = curRow.rowNo

          /** 加入行数组前更新当前行信息 */
          this.updateCurRowInfo(curRow, prevRow)
          prevRow = curRow
          rowList.push(curRow)

          /** 创建新行 */
          curRow = new Row({
            rowNo: rowNo + 1,
            globalFontOptions: this.globalFontOptions
          })
          curRow.setSize({ width: 0, height: this.globalFontOptions.lineHeight })
          curRow.setPos({ x: 0, y: prevRow ? prevRow.y + prevRow.height : 0 })

          /** 循环检测碰撞,直到找到图片左侧可以放下 curItem 的行 */
          while (
            /** 左侧碰撞,代表左侧无空间, */
            checkCollision(
              {
                x: curRow.width,
                y: rowNo * this.globalFontOptions.lineHeight /** 下行 y 坐标 */,
                width: curItem.width,
                height: curItem.height
              },
              imgOrGraph
            )
          ) {
            /** 添加图片占位 */
            const ip = new ImgPlaceholder({
              owner: imgOrGraph,
              height: this.globalFontOptions.lineHeight
            })
            ip.setPos({ x: imgOrGraph.x, y: curRow.y })

            curRow.addChild(ip)
            curRow.setSize({ width: imgOrGraph.x + imgOrGraph.width })

            /** 右侧剩余空间不够,需放到下行 */
            if (curItem.width >= maxWidth - curRow.width) {
              rowNo++

              /** 加入行数组前更新当前行信息 */
              this.updateCurRowInfo(curRow, prevRow)
              prevRow = curRow
              rowList.push(curRow)
              /** 创建新行 */
              curRow = new Row({
                rowNo: rowNo,
                globalFontOptions: this.globalFontOptions
              })
              curRow.setSize({ width: 0, height: this.globalFontOptions.lineHeight })
              curRow.setPos({ x: 0, y: prevRow ? prevRow.y + prevRow.height : 0 })
            }
          }

          /** 图片左侧可放下 */
          curItem.x = curRow.width

          curRow.addChild(curItem)
          curRow.setSize({ width: curRow.width + curItem.width })
        } else {
          /** 未超宽 */
          curItem.x = curRow.width

          curRow.addChild(curItem)
          curRow.setSize({ width: curRow.width + curItem.width })
        }
      }

      /** 最后行 */
      /** 加入行数组前更新当前行信息 */
      this.updateCurRowInfo(curRow, prevRow)
      /** 记录prevRow */
      prevRow = curRow
      /** 换行,将当前行塞入数组 */
      rowList.push(curRow)
    } else if (imgOrGraph.imgSurroundType === ImgSurrounTypeEnum.ABSOLUTE) {
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
    })
    curRow.x = 0

    let prevRow: Row | null = null

    for (let i = 0, curItem: Char | Formula; i < textLayoutItemList.length; i++) {
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
      /** 更新当前行宽度 */
      curRow.width += curItem.width
    }

    /** 最后行 */
    this.updateCurRowInfo(curRow, prevRow)
    prevRow = curRow
    rowList.push(curRow)

    return rowList
  }

  private updateCurRowInfo(curRow: Row, prevRow: Row | null) {
    /** 更新当前行行高 */
    curRow.height = Math.max(this.globalFontOptions.lineHeight, this.getHighestRowChildHeight(curRow.childs))

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
  private getHighestRowChildHeight(rowChild: RowChild[]): number {
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
  public isFontLoaded() {
    return this.font.status === 'loaded'
  }
}
