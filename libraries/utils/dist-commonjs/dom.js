'use strict'
/**
 * @author GuangHui
 * @description dom 操作相关
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.loadJs =
  exports.loadCss =
  exports.watermarkSvg =
  exports.makeSvgInline =
  exports.escapeSvg =
  exports.genSvgText =
  exports.supportWebp =
  exports.matches =
  exports.canSupportCssVar =
  exports.addStyle =
  exports.getStyle =
  exports.scrollToTop =
  exports.copyToClipboard =
  exports.getRect =
  exports.getData =
  exports.hasClass =
  exports.removeClass =
  exports.addClass =
  exports.measureImgSize =
    void 0
const tools_1 = require('./tools')
const type_judge_1 = require('./type-judge')
/**
 * 测量图片尺寸
 *
 * @date 2023-07-18 00:17:21
 * @export
 * @param src 图片链接
 * @returns {{width:number,height:number}} 款片宽高尺寸对象
 */
function measureImgSize(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
  })
}
exports.measureImgSize = measureImgSize
/**
 * 添加样式类
 * @param {Element} el 元素
 * @param {String} className 样式名
 */
function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  const newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}
exports.addClass = addClass
/**
 * 移除样式类
 * @param {Element} el 元素
 * @param {String} className 样式名
 */
function removeClass(el, className) {
  if (!hasClass(el, className)) {
    return
  }
  const newClassList = el.className.split(' ')
  newClassList.splice(newClassList.indexOf(className), 1)
  el.className = newClassList.join(' ')
}
exports.removeClass = removeClass
/**
 * 判断是否有样式类
 * @param {Element} el 元素
 * @param {String} className 样式类
 */
function hasClass(el, className) {
  const reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}
exports.hasClass = hasClass
/**
 * 获取/设置data-*
 * @param {Element} el 元素
 * @param {String} name 名称
 * @param {Any} val 需要设置的值
 */
function getData(el, name, val) {
  const prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}
exports.getData = getData
/**
 * 获取元素尺寸
 * @param {Element} el 元素
 */
function getRect(el) {
  if (el instanceof window.SVGElement) {
    const rect = el.getBoundingClientRect()
    return {
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height
    }
  } else {
    return {
      top: el.offsetTop,
      left: el.offsetLeft,
      width: el.offsetWidth,
      height: el.offsetHeight
    }
  }
}
exports.getRect = getRect
/**
 * 复制到剪贴板
 * @param {String} str 需要复制的字符串
 */
function copyToClipboard(str) {
  const el = document.createElement('textarea')
  el.value = str
  el.setAttribute('readonly', '')
  el.style.position = 'absolute'
  el.style.left = '-9999px'
  document.body.appendChild(el)
  const selected = document.getSelection().rangeCount > 0 ? document.getSelection().getRangeAt(0) : false
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  if (selected) {
    document.getSelection().removeAllRanges()
    document.getSelection().addRange(selected)
  }
}
exports.copyToClipboard = copyToClipboard
/**
 * 滚动html到顶部
 */
function scrollToTop() {
  const c = document.documentElement.scrollTop || document.body.scrollTop
  if (c > 0) {
    window.requestAnimationFrame(scrollToTop)
    window.scrollTo(0, c - c / 8)
  }
}
exports.scrollToTop = scrollToTop
/**
 * 获取计算样式
 * @param {Object} el
 * @returns {Object} 样式对象
 */
function getStyle(el) {
  // * 使用defaultView兼容FF<=30中出现的问题
  var view = el.ownerDocument.defaultView
  if (!view || !view.opener) {
    view = window
  }
  return view.getComputedStyle(el, null)
}
exports.getStyle = getStyle
/**
 * 添加样式
 * @param {Element} el 元素
 * @param {Object} styleObj 样式obj
 */
function addStyle(el, styleObj) {
  const oldStyle = el.style.cssText
  const newStyle = Object.entries(styleObj).reduce((acc, cur) => {
    cur[0] = (0, tools_1.str2kebab)(cur[0]) // key转换成kebab-case
    return (acc += cur.join(':') + ';')
  }, oldStyle)
  el.style.cssText = newStyle
}
exports.addStyle = addStyle
/**
 * 判断是否支持css3 变量
 *
 * @export
 * @returns 是否支持
 */
const canSupportCssVar = () => {
  if (exports.canSupportCssVar.isSupport != null) return exports.canSupportCssVar.isSupport
  const id = 'test-support-css-var'
  let styleEl = document.createElement('style')
  styleEl.innerText =
    styleEl.innerText = `:root{--${id}:-9999;}#${id}{position:absolute;top:-99999em;left:-99999em;z-index:var(--${id});opacity:0;font-size:0;width:0;height:0;pointer-events: none;}`
  document.head.appendChild(styleEl)
  let testSpan = document.createElement('span')
  testSpan.id = id
  document.body.appendChild(testSpan)
  const styleObj = getStyle(testSpan)
  const isSupport = !!styleObj && styleObj.zIndex === '-9999'
  document.head.removeChild(styleEl)
  document.body.removeChild(testSpan)
  styleEl = null
  testSpan = null
  exports.canSupportCssVar.isSupport = isSupport
  return isSupport
}
exports.canSupportCssVar = canSupportCssVar
/**
 * 查看某元素是否命中css选择器字符串
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Element/matches
 * https://blog.csdn.net/king_xing/article/details/50460580
 *
 * @export
 * @param {Element} el 需要检测的el
 * @param {String} selector css选择器字符串
 * @returns 是否命中
 */
function matches(el, selector) {
  const fn =
    Element.prototype.matches ||
    // @ts-ignore
    Element.prototype.matchesSelector ||
    // @ts-ignore
    Element.prototype.mozMatchesSelector ||
    // @ts-ignore
    Element.prototype.msMatchesSelector ||
    // @ts-ignore
    Element.prototype.oMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    function (s) {
      // @ts-ignore
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length
      // @ts-ignore
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1
    }
  return fn.call(el, selector)
}
exports.matches = matches
/**
 * 检查是否支持webp格式图片
 *
 * @export
 * @returns 是否支持webp
 */
function supportWebp() {
  try {
    return document.createElement('canvas').toDataURL('image/webp').indexOf('data:image/webp') === 0
  } catch (err) {
    return false
  }
}
exports.supportWebp = supportWebp
/**
 * 生成svg文本
 *
 * @export
 * @param {*} [{
 *   width = 300,
 *   height = 150,
 *   fontSize = 14,
 *   fontFamily = 'system-ui, sans-serif',
 *   color = '#a2a9b6',
 *   opacity = 1,
 *   x = 50,
 *   y = 50,
 *   content = 'svg测试文本',
 *   transform = 'rotate(0,0,0)'
 * }={}]
 * @return {String} svg字符串（未转义）
 */
function genSvgText({
  width = 300,
  height = 150,
  fontSize = 14,
  fontFamily = 'system-ui, sans-serif',
  color = '#a2a9b6',
  opacity = 1,
  x = 50,
  y = 50,
  content = 'svg测试文本',
  rotate = 0
} = {}) {
  const size = width === 300 && height === 150 ? '' : ` width="${width}" height="${height}"`
  const fill = color === '#000000' || color === '#000' ? '' : ` fill="${color}"`
  const fillOpacity = opacity === 1 ? '' : ` fill-opacity="${opacity}"`
  const fontF = fontFamily ? ` font-family="${fontFamily}"` : ''
  // 旋转除2参考：https://www.zhangxinxu.com/wordpress/2015/10/understand-svg-transform/
  const transformAttr = rotate && size ? ` transform="rotate(${rotate}, ${width / 2} ,${height / 2})"` : ''
  return `<svg${size} xmlns="http://www.w3.org/2000/svg"><text x="${x}%" y="${y}%" font-size="${fontSize}"${fill}${fillOpacity}${fontF}${transformAttr} text-anchor="middle" dominant-baseline="middle">${content}</text></svg>`
}
exports.genSvgText = genSvgText
/**
 * 安全转义svg字符串
 *
 * @export
 * @param {String} svg svg字符串
 * @return {String} 转移后的svg字符串
 */
function escapeSvg(svg) {
  return svg
    .trim()
    .trim()
    .replace(/\n/g, '')
    .replace(/"/g, "'")
    .replace(/%/g, '%25')
    .replace(/#/g, '%23')
    .replace(/{/g, '%7B')
    .replace(/}/g, '%7D')
    .replace(/</g, '%3C')
    .replace(/>/g, '%3E')
}
exports.escapeSvg = escapeSvg
/**
 * 生成内联svg
 *
 * @export
 * @param {String} svg 未转义的svg字符串
 * @return {String} 转义后的内联svg字符串
 * 参考：
 * https://www.zhangxinxu.com/wordpress/2020/10/text-as-css-background-image/
 * https://www.zhangxinxu.com/wordpress/2015/10/understand-svg-transform/
 * https://www.zhangxinxu.com/wordpress/2018/08/css-svg-background-image-base64-encode/
 */
function makeSvgInline(svg) {
  return `data:image/svg+xml;utf8,${escapeSvg(svg)}`
}
exports.makeSvgInline = makeSvgInline
/**
 * 生成水印svg(包含默认属性)
 *
 * @export
 * @param {Object} params
 * @return {String} 转义后的内联svg字符串
 */
function watermarkSvg(params = {}) {
  return makeSvgInline(
    genSvgText({
      rotate: -45,
      width: 200,
      height: 200,
      opacity: 0.5,
      content: '水印',
      ...params
    })
  )
}
exports.watermarkSvg = watermarkSvg
/**
 * 加载css
 *
 * @export
 * @param {String} href css地址
 * @param {Object} [options={ rel: 'stylesheet' }] 额外options
 * @return {Promise}  promise实例
 */
function loadCss(href, options = { rel: 'stylesheet' }) {
  return new Promise((resolve, reject) => {
    if (typeof href !== 'string') return reject('must specify href(string)')
    let link = document.createElement('link')
    link.href = href
    const op = Object.assign({}, { rel: 'stylesheet' }, options)
    // @ts-ignore
    !(0, type_judge_1.isEmpty)(op) && Object.entries(op).forEach(([key, val]) => (link[key] = val))
    document.head.appendChild(link)
    link.onload = () => {
      link = null
      resolve(void 0)
    }
    link.onerror = () => {
      document.head.removeChild(link)
      link = null
      reject(new Error(`load css failed:${href}`))
    }
  })
}
exports.loadCss = loadCss
/**
 * 加载js
 *
 * @export
 * @param {String} src script地址
 * @param {Object} [options={ type: 'text/javascript' }] 额外options
 * @return {Promise}  promise实例
 */
function loadJs(src, options = { type: 'text/javascript' }) {
  return new Promise((resolve, reject) => {
    if (typeof src !== 'string') return reject('must specify src(string)')
    let script = document.createElement('script')
    script.src = src
    const op = Object.assign({}, { type: 'text/javascript' }, options)
    // @ts-ignore
    !(0, type_judge_1.isEmpty)(op) && Object.entries(op).forEach(([key, val]) => (script[key] = val))
    document.body.appendChild(script)
    script.onload = () => {
      script = null
      resolve(void 0)
    }
    script.onerror = () => {
      document.body.removeChild(script)
      script = null
      reject(new Error(`load js failed:${src}`))
    }
  })
}
exports.loadJs = loadJs
//# sourceMappingURL=dom.js.map
