'use strict'
/**
 * @author GuangHui
 * @description 输入 latex 字符串,输出 svg dataurl ,此 dataurl 可供 canvas 消费
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.transformSvgEl2DataUrl = exports.transformLatexToSVGDataUrl = void 0
/**
 * 将 latex 公式转为 svg dataurl
 *
 * @date 2023-03-28 19:27:07
 * @export
 * @param latex latex 公式字符串
 * @param retryInterval 重试间隔 默认500ms
 * @param retryMaxCount 重试最大次数 默认10
 * @param outputType 输出类型,默认 dataUrl
 * @returns {Promise<TransformLatexToSVGDataUrlRet>} svg dataurl
 */
function transformLatexToSVGDataUrl({
  latex,
  retryInterval = 500,
  retryMaxCount = 10,
  outputType = 'dataUrl'
} = {}) {
  if (!window.MathJax) throw new Error('window.MathJax can not access')
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
          if (outputType === 'dataUrl') {
            resolve(transformSvgEl2DataUrl(svg))
          } else if (outputType === 'svgStr') {
            resolve(new XMLSerializer().serializeToString(svg))
          } else {
            resolve({
              dataUrl: transformSvgEl2DataUrl(svg),
              svgStr: new XMLSerializer().serializeToString(svg)
            })
          }
        } catch (error) {
          console.log('error :>> ', error)
          retryCount++
          clearTimeout(timer)
          timer = setTimeout(() => {
            display()
          }, retryInterval)
        }
      }
      display()
    })
  })
}
exports.transformLatexToSVGDataUrl = transformLatexToSVGDataUrl
/**
 * 将 svg 元素内容转为 dataurl
 *
 * @date 2023-03-28 17:34:57
 * @export
 * @param svgEl
 * @returns {string} dataurl
 */
function transformSvgEl2DataUrl(svgEl) {
  return (
    'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(new XMLSerializer().serializeToString(svgEl))
  )
}
exports.transformSvgEl2DataUrl = transformSvgEl2DataUrl
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
  var mathJaxGlobalDef = document.querySelector('#MathJax_SVG_glyphs')
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
  const renderContainerId = `CanvasLatexRenderContainer_${new Date().getTime()}`
  div.id = renderContainerId
  div.style.display = 'none'
  div.style.visibility = 'hidden'
  div.style.position = 'absolute'
  div.style.left = '-1000px'
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
  let script = document.createElement('script')
  const canvasLatexLatexScriptId = `CanvasLatexLatexScript_${new Date().getTime()}`
  script.id = canvasLatexLatexScriptId
  script.type = 'math/tex'
  script.innerHTML = latex
  return script
}
//# sourceMappingURL=latex-svg-dataurl.js.map
