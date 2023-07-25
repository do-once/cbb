'use strict'
/**
 * @author GuangHui
 * @description 公式
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.Formula = exports.FormulaRenderTypeEnum = void 0
const latex_svg_dataurl_1 = require('@doonce/latex-svg-dataurl')
const utils_1 = require('@doonce/utils')
const base_1 = require('../base')
var FormulaRenderTypeEnum
;(function (FormulaRenderTypeEnum) {
  FormulaRenderTypeEnum['SVG'] = 'SVG'
  FormulaRenderTypeEnum['IMG'] = 'IMG'
})((FormulaRenderTypeEnum = exports.FormulaRenderTypeEnum || (exports.FormulaRenderTypeEnum = {})))
class Formula extends base_1.Base {
  layoutItemType = base_1.LayoutItemTypeEnum.FORMULA
  canLineBreak = false
  rawContent
  content = ''
  /** 公式转换成的 svg 用什么方式渲染,svg 节点插入还是图片展示 */
  formulaRenderType
  globalFontOptions
  debug
  svgEl = null
  constructor({ rawContent, globalFontOptions, formulaRenderType, debug }) {
    super()
    if (!rawContent || !globalFontOptions || !formulaRenderType)
      throw new Error('rawContent globalFontOptions and formulaRenderType is required')
    this.rawContent = rawContent
    this.globalFontOptions = globalFontOptions
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
    return await (0, latex_svg_dataurl_1.transformLatexToSVGStrAndDataUrl)({ latex: this.rawContent })
  }
  parse2SvgEl(svgStr) {
    const doc = new DOMParser().parseFromString(svgStr, 'image/svg+xml')
    return doc.querySelector('svg')
  }
  async measureSize() {
    const { width, height } =
      this.formulaRenderType === FormulaRenderTypeEnum.SVG
        ? this.measureSizeWithSvgEl(this.svgEl, this.globalFontOptions)
        : await this.measureSizeWithSvgDataUrl(this.content)
    return { width, height }
  }
  measureSizeWithSvgEl(svgEl, globalFontOptions) {
    if (!svgEl) throw new Error('svgEl is required')
    let frag = document.createDocumentFragment()
    let div = document.createElement('div')
    /** 设置字体 */
    div.style.cssText = `font:${(0, utils_1.getCssFontDesc)({
      ...globalFontOptions,
      lineHeight: globalFontOptions.lineHeight + 'px'
    })};visibility: hidden;position: absolute;left: -100vw;`
    div.appendChild(svgEl)
    frag.appendChild(div)
    document.body.appendChild(frag)
    const { width, height } = svgEl.getBoundingClientRect()
    document.body.removeChild(div)
    return { width, height }
  }
  async measureSizeWithSvgDataUrl(svgDataUrl) {
    return await (0, utils_1.measureImgSize)(svgDataUrl)
  }
}
exports.Formula = Formula
//# sourceMappingURL=Formula.js.map
