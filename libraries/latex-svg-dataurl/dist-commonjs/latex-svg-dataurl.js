'use strict'
/**
 * @author GuangHui
 * @description 输入 latex 字符串,输出 svgStr 和dataUrl ,此 dataUrl 可供 canvas 消费
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.transformLatexToSVGStrAndDataUrl = void 0
const utils_1 = require('@doonce/utils')
/**
 * 输入 latex 字符串,输出 svgStr 和dataUrl
 *
 * @date 2023-07-19 21:10:27
 * @export
 * @param params 入参
 * @returns {TransformLatexToSVGStrAndDataUrlRet} 转换后的 svgStr 和 dataUrl 结果对象
 */
function transformLatexToSVGStrAndDataUrl(params) {
  if (!window.MathJax) throw new Error('window.MathJax can not access')
  if (!params.latex) throw new Error('latex is required')
  const latex = params.latex
  const retryInterval = params.retryInterval ?? 500
  const retryMaxCount = params.retryMaxCount ?? 10
  const renderContainer = createRenderContainer()
  const scriptElWithLatex = createScriptElWithLatex(latex)
  renderContainer.appendChild(scriptElWithLatex)
  document.body.appendChild(renderContainer)
  return new Promise((resolve, reject) => {
    window.MathJax.Hub.Process(scriptElWithLatex, () => {
      /** Mathjax 处理后,会生成一个 span 元素,其 id 为script.id + `-Frame` */
      /** 此 frame 包含生成后的 svg,此 svg通过 use 使用了MathJax_SVG_glyphs中的 def */
      /** 生成 dataurl 需要将 MathJax_SVG_glyphs中的 def 拷贝到 frame 下进行生成*/
      const mathjaxFrameId = `#${scriptElWithLatex.id}-Frame`
      let retryCount = 0
      let timer
      function display() {
        try {
          if (retryCount >= retryMaxCount) {
            reject(`超过重试次数:${retryMaxCount}`)
            return
          }
          const frame = document.querySelector(mathjaxFrameId)
          if (!frame) throw new Error(`${mathjaxFrameId} element dont exist`)
          const svg = cloneGlobalSvgDefsIntoSvg(frame)
          const svgStr = new XMLSerializer().serializeToString(svg)
          resolve({
            svgStr,
            dataUrl: 'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgStr)
          })
        } catch (error) {
          console.log('error :>> ', error)
          retryCount++
          clearTimeout(timer)
          timer = setTimeout(display, retryInterval)
        }
      }
      display()
    })
  })
}
exports.transformLatexToSVGStrAndDataUrl = transformLatexToSVGStrAndDataUrl
/**
 * 将 mathjax 生成的 svg defs拷贝到 mathjaxFrame 的 svg 下
 *
 * @date 2023-03-28 17:35:38
 * @param mathjaxFrame
 * @returns {SVGElement} mathjaxFrame 的 svg
 */
function cloneGlobalSvgDefsIntoSvg(mathjaxFrame) {
  /** 找到 frame 下的 svg */
  const svg = mathjaxFrame.querySelector('svg')
  /** 找到 svg 里包含的 use元素,并获取其 href */
  const useEls = svg.querySelectorAll('use')
  if (!useEls || !useEls.length) return svg
  const useElHrefs = Array.from(useEls)
    .map(useEl => {
      return useEl.getAttribute('href')
    })
    .filter(href => !!href)
  /** 根据 href 在mathjax svg def中进行查找.若有,则拷贝到新建的 svgDef 中 */
  const mathJaxGlobalDef = document.querySelector('#MathJax_SVG_glyphs')
  const svgDef = document.createElement('def')
  svgDef.id = `CanvasLatexSvgDef_${mathjaxFrame.id}`
  useElHrefs.forEach(href => {
    if (mathJaxGlobalDef?.querySelector(href)) {
      svgDef.appendChild(mathJaxGlobalDef.querySelector(href)?.cloneNode(true))
    }
  })
  svg.appendChild(svgDef)
  return svg
}
/**
 * 创建 renderContainer
 *
 * @date 2023-03-28 17:36:27
 * @returns {HTMLDivElement} renderContainer
 */
function createRenderContainer() {
  const div = document.createElement('div')
  div.id = `CanvasLatexRenderContainer_${(0, utils_1.uuid)()}`
  div.style.display = 'none'
  div.style.visibility = 'hidden'
  div.style.position = 'absolute'
  div.style.left = '-100vw'
  return div
}
/**
 * 创建包含 latex 的 script
 *
 * @date 2023-03-28 17:37:00
 * @param latex
 * @returns {HTMLScriptElement} scriptEl
 */
function createScriptElWithLatex(latex) {
  const script = document.createElement('script')
  script.id = `CanvasLatexLatexScript_${(0, utils_1.uuid)()}`
  script.type = 'math/tex'
  script.innerHTML = latex
  return script
}
//# sourceMappingURL=latex-svg-dataurl.js.map
