/**
 * @author GuangHui
 * @description 公式
 */

import { transformLatexToSVGStrAndDataUrl } from '@doonce/latex-svg-dataurl'
import { getCssFontDesc, measureImgSize } from '@doonce/utils'

import { GlobalFontConfig } from '../../DoonceLayoutEngine'
import { Base, IContent, ISize, LayoutItemTypeEnum } from '../base'

export enum FormulaRenderTypeEnum {
  SVG = 'SVG',
  IMG = 'IMG'
}

export type FormulaCtrOptions = {
  rawContent: string /** 公式原始内容 */
  globalFontConfig: GlobalFontConfig /** 字体设置项 */
  formulaRenderType: FormulaRenderTypeEnum /** 公式渲染类型,SVG(dom 节点) 或 IMG */
  debug?: boolean /** 调试 */
}

export class Formula extends Base implements IContent {
  layoutItemType: LayoutItemTypeEnum = LayoutItemTypeEnum.FORMULA
  canLineBreak: boolean = false

  rawContent: string
  content: string = ''

  /** 公式转换成的 svg 用什么方式渲染,svg 节点插入还是图片展示 */
  formulaRenderType: FormulaRenderTypeEnum
  globalFontConfig: GlobalFontConfig
  debug: boolean

  svgEl: SVGSVGElement = null as unknown as SVGSVGElement

  constructor({ rawContent, globalFontConfig, formulaRenderType, debug }: FormulaCtrOptions) {
    super()

    if (!rawContent || !globalFontConfig || !formulaRenderType)
      throw new Error('rawContent globalFontConfig and formulaRenderType is required')

    this.rawContent = rawContent
    this.globalFontConfig = globalFontConfig
    this.formulaRenderType = formulaRenderType
    this.debug = debug ?? false
  }

  async init() {
    const { svgStr, dataUrl } = await this.getSvgStrAndDataUrl()
    if (this.debug) {
      console.group(`rawContent: ${this.rawContent}`)
      console.log('svgStr :>> ', svgStr)
      console.log('dataUrl :>> ', dataUrl)
      console.groupEnd()
    }

    /** 手动指定 img 渲染方式 */
    if (this.formulaRenderType === FormulaRenderTypeEnum.IMG) {
      this.content = dataUrl
    } else {
      const svgEl = this.parse2SvgEl(svgStr)

      if (svgEl) {
        /** svg 支持 */
        this.content = svgStr
        this.svgEl = svgEl
      } else {
        // ? 兜底是否合适?如果不能反序列化为 svg 节点,那 mathjax 渲染为svg 就应该有问题了
        // ? 此处值得再考虑下
        /**  svg 不支持,兜底使用图片形式渲染 */
        this.formulaRenderType = FormulaRenderTypeEnum.IMG
        this.content = dataUrl
      }
    }

    const { width, height } = await this.measureSize()
    this.width = width
    this.height = height
  }

  async getSvgStrAndDataUrl() {
    return await transformLatexToSVGStrAndDataUrl({ latex: this.rawContent })
  }

  parse2SvgEl(svgStr: string) {
    const doc = new DOMParser().parseFromString(svgStr, 'image/svg+xml')
    return doc.querySelector('svg')
  }

  async measureSize(): Promise<ISize> {
    const { width, height } =
      this.formulaRenderType === FormulaRenderTypeEnum.SVG
        ? this.measureSizeWithSvgEl(this.svgEl, this.globalFontConfig)
        : await this.measureSizeWithSvgDataUrl(this.content)

    return { width, height }
  }

  measureSizeWithSvgEl(svgEl: SVGSVGElement, globalFontConfig: GlobalFontConfig): ISize {
    if (!svgEl) throw new Error('svgEl is required')

    let frag = document.createDocumentFragment()
    let div = document.createElement('div')

    /** 设置字体 */
    div.style.cssText = `font:${getCssFontDesc({
      ...globalFontConfig,
      lineHeight: globalFontConfig.lineHeight + 'px'
    })};visibility: hidden;position: absolute;left: -100vw;`

    div.appendChild(svgEl)
    frag.appendChild(div)
    document.body.appendChild(frag)

    const { width, height } = svgEl.getBoundingClientRect()

    document.body.removeChild(div)

    return { width, height }
  }

  async measureSizeWithSvgDataUrl(svgDataUrl: string): Promise<ISize> {
    return await measureImgSize(svgDataUrl)
  }
}
