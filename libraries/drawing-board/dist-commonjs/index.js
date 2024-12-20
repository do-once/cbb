'use strict'
/**
 * @author GuangHui
 * @description 绘图板
 */
Object.defineProperty(exports, '__esModule', { value: true })
const file_convert_1 = require('./libs/file-convert')
const utils_1 = require('./libs/utils')
const dom_1 = require('./libs/dom')
const err_msg_1 = require('./libs/err-msg')
const touch_offset_1 = require('./libs/touch-offset')
class DrawingBoard {
  static INTERACTIVE_MODE_ENUM = ['mouse', 'touch', 'both'] // 支持的交互模式枚举
  static IMG_TYPE_ENUM = ['jpg', 'jpeg', 'png', 'webp'] // 支持的图片类型枚举
  static PEN_MODE_ENUM = ['paint', 'drag', 'empty'] // 支持的画笔模式枚举
  static DEFAULT_WIDTH = 300 // 默认宽度
  static DEFAULT_HEIGHT = 150 // 默认高度
  static LIMIT_MIN_REVOKE_STEPS = 10 // 最大撤销步数 下限值
  static LIMIT_MAX_REVOKE_STEPS = 50 // 最大撤销步数 上限值
  static LIMIT_MIN_SCALE = 0.1 // 最小缩放值，最小需做限制，最大无需限制
  static DEFAULT_SCALE = 1 // 默认缩放值
  static DEFAULT_MAX_SCALE = 5 // 默认最大缩放值
  static _defaultOptions = {
    size: [],
    className: '',
    manualMount: false,
    maxRevokeSteps: 10,
    interactiveMode: 'mouse',
    penMode: 'empty',
    penColor: 'red',
    penWidth: 6,
    bgImgURL: '',
    bgImgRotate: 0,
    bgColor: '#fff',
    onRevokeStackChange: null,
    onPaintEnd: null,
    minScale: 1,
    maxScale: 3,
    initialScale: 1,
    scaleTransition: true,
    scaleStep: 0.1 // 缩放步进值
  }
  originalOptions // 原始选项
  options // 合并后的选项
  container
  el
  width
  height
  manualMount // 是否手动挂载
  revokeStack // 撤销栈
  MAX_REVOKE_STEPS // 最大撤销步数
  isPainting // 是否绘制中
  lastPaintPoint // 最后一个绘制点坐标
  isDraging // 是否拖拽中
  lastDragPoint // 最后一个拖拽点坐标
  dragTransformX // x偏移值
  dragTransformY // Y偏移值
  penMode // 画笔模式
  interactiveMode // 交互模式
  eventList // 事件列表
  penColor // 画笔颜色
  penWidth // 画笔粗细
  className // 自定义样式类
  bgImgURL // 背景图url
  bgColor // 背景色
  bgImgRotate // 背景图旋转角度
  _bgImgObject // 背景图Image对象
  originalSize // 原始尺寸
  onRevokeStackChange // 撤销回调
  onPaintEnd // 绘制结束回调
  paintCount // 绘制次数
  scaleTransition // 缩放动画
  minScale // 最小缩放值
  maxScale // 最大缩放值
  initialScale // 初始缩放值
  scale // 当前缩放值
  scaleStep // 缩放步进值
  ctx // 绘图上下文
  /**
   * Creates an instance of DrawingBoard.
   *
   * @param {(HTMLElement | string)} container 选择器或el
   * @param {Options} options 选项
   * @memberof DrawingBoard
   */
  constructor(container, options) {
    if (!container) throw new Error(err_msg_1.MSG_CONTAINER_MISS_SELECTOR)
    this.container = this._getContainer(container)
    this.originalOptions = options
    this.options = {
      ...DrawingBoard._defaultOptions,
      ...options
    }
    const {
      size,
      className,
      manualMount,
      maxRevokeSteps,
      interactiveMode,
      penColor,
      penWidth,
      bgImgURL,
      bgImgRotate,
      bgColor,
      onRevokeStackChange,
      onPaintEnd,
      penMode,
      minScale,
      maxScale,
      initialScale,
      scaleTransition,
      scaleStep
    } = this.options
    // 尺寸未传，则使用容器的尺寸
    const [width, height] = size || []
    this.width = DrawingBoard.DEFAULT_WIDTH
    this.height = DrawingBoard.DEFAULT_HEIGHT
    this.setSize([
      width == null ? DrawingBoard.DEFAULT_WIDTH : width,
      height == null ? DrawingBoard.DEFAULT_HEIGHT : height
    ])
    this.manualMount = !!manualMount
    this.revokeStack = []
    this.MAX_REVOKE_STEPS = this._getLawfulMaxRevokeSteps(Number(maxRevokeSteps))
    this.isPainting = false
    this.lastPaintPoint = null
    this.isDraging = false
    this.lastDragPoint = null
    this.dragTransformX = 0
    this.dragTransformY = 0
    this.penMode = this._getPenMode(penMode)
    this.interactiveMode = this._getInteractiveMode(interactiveMode)
    this.eventList = this._makeEventList()
    this.penColor = this._getPenColor(penColor)
    this.penWidth = this._getPenWidth(penWidth)
    this.className = this._getClassName(className)
    this.bgImgURL = bgImgURL || ''
    this.bgColor = bgColor || ''
    this.bgImgRotate = this._getLawfulRotateAngle(bgImgRotate)
    this._bgImgObject = null
    this.originalSize = []
    if (bgImgURL) this._getImgAndDraw(bgImgURL) // 有设置背景图，则获取并绘制
    this.onRevokeStackChange = onRevokeStackChange
    this.onPaintEnd = onPaintEnd
    this.paintCount = 0 // 记录绘制次数
    this.scaleTransition = !!scaleTransition // 缩放动画
    this.scaleStep = typeof scaleStep !== 'number' || isNaN(scaleStep) ? 0.1 : scaleStep
    // 限制最小、最大缩放比例
    this.minScale = this._getLawfulMinScale(minScale)
    this.maxScale = this._getLawfulMaxScale(maxScale)
    this.initialScale = this._getLawfulScale(initialScale) // 获取合法初始缩放值
    this.scale = this.initialScale // 获取合法的缩放值
    // 下一循环，等待mount后，设置缩放
    setTimeout(() => {
      this._handleScaleChange()
    }, 0)
    if (this.container) this.container.style.overflow = 'hidden' // 设置容器溢出隐藏，防止缩放展示出现异常
    this.el = null
    this.ctx = null
    if (!this.manualMount) this.mount() // 不需要手动挂载时，自动挂载
  }
  /**
   * 获取合法的缩放值
   *
   * @private
   * @param {*} scale 缩放值
   * @returns {number} 合法的缩放值
   * @memberof DrawingBoard
   */
  _getLawfulScale(scale) {
    if (typeof scale !== 'number' || isNaN(scale)) return DrawingBoard.DEFAULT_SCALE
    if (scale < this.minScale) return this.minScale
    if (scale > this.maxScale) return this.maxScale
    return scale
  }
  /**
   * 获取合法的最小缩放值
   *
   * @private
   * @param {*} scale 缩放值
   * @returns {number} 合法的最小缩放值
   * @memberof DrawingBoard
   */
  _getLawfulMinScale(scale) {
    if (typeof scale !== 'number' || isNaN(scale) || scale < DrawingBoard.LIMIT_MIN_SCALE)
      return DrawingBoard.LIMIT_MIN_SCALE
    return scale
  }
  /**
   * 获取合法的最大缩放值
   *
   * @private
   * @param {*} scale 缩放值
   * @returns {number} 合法的最大缩放值
   * @memberof DrawingBoard
   */
  _getLawfulMaxScale(scale) {
    if (typeof scale !== 'number' || isNaN(scale) || scale < DrawingBoard.LIMIT_MIN_SCALE)
      return DrawingBoard.DEFAULT_MAX_SCALE
    return scale
  }
  /**
   * 获取合法的交互模式
   *
   * @private
   * @param {*} mode 模式字符串
   * @returns {PEN_MODE} 模式字符串
   * @memberof DrawingBoard
   */
  _getInteractiveMode(mode) {
    return DrawingBoard.INTERACTIVE_MODE_ENUM.includes(mode) ? mode : 'mouse'
  }
  /**
   * 获取合法的画笔模式
   *
   * @private
   * @param {*} mode 模式字符串
   * @returns {PEN_MODE} 画笔模式
   * @memberof DrawingBoard
   */
  _getPenMode(mode) {
    return DrawingBoard.PEN_MODE_ENUM.includes(mode) ? mode : 'empty'
  }
  /**
   * 获取container容器
   *
   * @private
   * @param {(HTMLElement | string)} container 选择器或el
   * @returns container容器el
   * @memberof DrawingBoard
   */
  _getContainer(container) {
    if (container instanceof HTMLElement) return container
    const el = (0, dom_1.$)(container)
    if (el == null) {
      throw new Error(err_msg_1.MSG_CONTAINER_NOT_FOUND)
    } else {
      return el
    }
  }
  /**
   * 获取合法className
   *
   * @private
   * @param {*} name 样式类
   * @returns {string} 合法样式类
   * @memberof DrawingBoard
   */
  _getClassName(name) {
    return name && typeof name === 'string' ? name : ''
  }
  /**
   * 获取合法penColor
   *
   * @private
   * @param {*} color 颜色
   * @returns {string} 合法颜色值
   * @memberof DrawingBoard
   */
  _getPenColor(color) {
    return !color || typeof color !== 'string' ? 'red' : color
  }
  /**
   * 获取合法penWidth
   *
   * @private
   * @param {*} width 粗细
   * @returns {number}  合法画笔粗细
   * @memberof DrawingBoard
   */
  _getPenWidth(width) {
    return !width || typeof width !== 'number' || isNaN(width) || width <= 0 ? 6 : width
  }
  /**
   * 获取合法角度值(逆时针旋转角度记录为正值，-90度 记录为270；450记录为90,10度记录为0,55度记录为90)
   *
   * @private
   * @param {*} angle 角度
   * @returns {number} 合法角度值
   * @memberof DrawingBoard
   */
  _getLawfulRotateAngle(angle) {
    if (typeof angle !== 'number' || isNaN(angle)) throw new Error(err_msg_1.MSG_ANGLE_NOT_LAWFUL)
    const tempAngle = angle % 360
    const newAngle = tempAngle < 0 ? tempAngle + 360 : tempAngle
    // 角度>=45，计入下一个90度，保证返回的角度 % 90 ===0
    const roundAngle =
      newAngle % 90 >= 45 ? (Math.ceil(newAngle / 90) * 90) % 360 : (Math.floor(newAngle / 90) * 90) % 360
    // 可能存在-0
    return Math.abs(roundAngle)
  }
  /**
   * 获取事件相对触发对象的偏移值
   *
   * @private
   * @param {(MouseEvent | TouchEvent)} e 事件对象
   * @returns {Point} 坐标
   * @memberof DrawingBoard
   */
  _getPointOffset(e) {
    if (e instanceof MouseEvent) {
      return {
        x: e.offsetX,
        y: e.offsetY
      }
    } else {
      const { touches } = e
      const { clientX, clientY } = touches[0]
      // 获取滚动距离来计算绘画位置
      const { parentScrollTop, parentScrollLeft } = (0, touch_offset_1.getScroll)(e.target)
      const { x, y } = (0, touch_offset_1.getOffsetPosition)(
        clientX + parentScrollLeft,
        clientY + parentScrollTop,
        this.el
      )
      return { x, y }
    }
  }
  /**
   * 获取合法的最大撤销步数
   *
   * @private
   * @param {number} steps steps 步数
   * @returns {number} 合法的最大撤销步数
   * @memberof DrawingBoard
   */
  _getLawfulMaxRevokeSteps(steps) {
    if (steps <= 0 || typeof steps !== 'number' || isNaN(steps)) return DrawingBoard.LIMIT_MIN_REVOKE_STEPS
    if (steps > DrawingBoard.LIMIT_MAX_REVOKE_STEPS) return DrawingBoard.LIMIT_MAX_REVOKE_STEPS
    return steps
  }
  /**
   * 获取模式对应的指针类型
   * @param {string} mode 模式
   * @returns 类型字符串
   */
  _getPointerType(mode) {
    if (mode === 'both') {
      return 'touchAndMouse'
    } else if (mode === 'touch') {
      return 'touch'
    } else {
      return 'mouse'
    }
  }
  /**
   * 生成事件映射列表
   *
   * @private
   * @returns {EventItem[]} 事件映射列表
   * @memberof DrawingBoard
   */
  _makeEventList() {
    return [
      {
        pointerType: 'mouse',
        action: 'start',
        name: 'mousedown',
        handler: this._handlePointerStart
      },
      {
        pointerType: 'mouse',
        action: 'move',
        name: 'mousemove',
        handler: this._handlePointerMove
      },
      {
        pointerType: 'mouse',
        action: 'end',
        name: 'mouseup',
        handler: this._handlePointerEnd
      },
      {
        pointerType: 'mouse',
        action: 'leave',
        name: 'mouseleave',
        handler: this._handlePointerLeave
      },
      {
        pointerType: 'touch',
        action: 'start',
        name: 'touchstart',
        handler: this._handlePointerStart
      },
      {
        pointerType: 'touch',
        action: 'move',
        name: 'touchmove',
        handler: this._handlePointerMove
      },
      {
        pointerType: 'touch',
        action: 'end',
        name: 'touchend',
        handler: this._handlePointerEnd
      },
      {
        pointerType: 'touch',
        action: 'cancel',
        name: 'touchcancel',
        handler: this._handlePointerCancel
      }
    ]
  }
  /**
   * 过滤出符合条件的EventItems
   *
   * @private
   * @param {EventItemCondition} 过滤条件
   * @returns {EventItem[]} EventItems数组
   * @memberof DrawingBoard
   */
  _getEventItems({ pointerType, action }) {
    let filterFn
    // pointerType不指定或为touchAndMouse时，只过滤action
    if (!pointerType || pointerType === 'touchAndMouse') {
      if (action) {
        filterFn = item => item.action === action
      } else {
        // pointerType、action都为空，则返回所有
        return this.eventList
      }
    } else {
      // pointerType存在并不为touchAndMouse时，需要同时过滤pointerType和action
      if (action) {
        filterFn = item => item.pointerType === pointerType && item.action === action
      } else {
        filterFn = item => item.pointerType === pointerType
      }
    }
    return this.eventList.filter(filterFn)
  }
  /**
   * 生成canvas元素
   *
   * @private
   * @returns {HTMLCanvasElement} canvas DOM对象
   * @memberof DrawingBoard
   */
  _makeCanvas() {
    return document.createElement('canvas')
  }
  /**
   * 获取绘图上下文
   *
   * @private
   * @returns {CanvasRenderingContext2D} 2d上下文
   * @memberof DrawingBoard
   */
  _getCtx() {
    const ctx = this.el && this.el.getContext && this.el.getContext('2d')
    if (ctx == null) throw new Error(err_msg_1.MSG_CTX_CANT_GET)
    return ctx
  }
  /**
   * 设置canvas transform
   *
   * @private
   * @param {number} x 横轴
   * @param {number} y 纵轴
   * @param {number} scale 缩放比例
   * @param {boolean} [transition=false] 过渡动画
   * @memberof DrawingBoard
   */
  _setCanvasTransform(x, y, scale, transition = false) {
    if (!this.el) return
    const text = `transform:scale(${scale}) translate3d(${x}px,${y}px,0);transform-origin:center;`
    const cssText = transition ? text + 'transition:0.3s;' : text
    this.el.setAttribute('style', cssText)
  }
  /**
   * 设置canvas dom尺寸
   *
   * @private
   * @param {number[]} [width, height] 宽高数组
   * @memberof DrawingBoard
   */
  _setDOMSize([width, height]) {
    if (width != null && this.el) this.el.width = width
    if (height != null && this.el) this.el.height = height
  }
  /**
   * 设置画笔模式
   *
   * @private
   * @param {PEN_MODE} mode 画笔模式
   * @memberof DrawingBoard
   */
  _setPenMode(mode) {
    if (!DrawingBoard.PEN_MODE_ENUM.includes(mode)) return
    this.penMode = mode
  }
  /**
   * 保存当前画布状态
   *
   * @private
   * @param {PEN_MODE} [type='paint'] 类型(绘制paint、清空clear) 默认paint
   * @param {number} paintCount 绘制次数
   * @param {ImageData} imageData 像素数据
   * @memberof DrawingBoard
   */
  _saveImageData(type = 'paint', paintCount, imageData) {
    if (
      !['paint', 'clear'].includes(type) ||
      paintCount == null ||
      !imageData ||
      !(imageData instanceof ImageData)
    ) {
      return
    }
    if (this.revokeStack.length >= this.MAX_REVOKE_STEPS) {
      this.revokeStack.shift()
    }
    // 保存类型及绘制次数(撤销时使用)
    this.revokeStack.push({ type, paintCount, imageData })
    this.onRevokeStackChange &&
      typeof this.onRevokeStackChange === 'function' &&
      this.onRevokeStackChange(this.revokeStack)
    console.log('_saveImageData onRevokeStackChange', this.revokeStack)
  }
  /**
   * 绑定当前模式对应动作的所有事件
   * @param {String} action 动作
   * @returns void
   */
  _bindCurInteractiveModeEvents(action) {
    if (!this.el) return
    const pointerType = this._getPointerType(this.interactiveMode)
    const condition = { pointerType, action }
    this._cleanCurInteractiveModeEvents(condition)
    this._bindEvent(condition)
  }
  /**
   * 清除当前模式对应动作的所有事件
   * @param {String} action 动作
   * @returns void
   */
  _cleanCurInteractiveModeEvents({ action }) {
    if (!this.el) return
    const pointerType = this._getPointerType(this.interactiveMode)
    const condition = { pointerType, action }
    this._cleanEvent(condition)
  }
  /**
   * 绑定符合特定条件的事件
   * @param {Object} condition 过滤条件
   * @returns void
   */
  _bindEvent(condition = {}) {
    const eventItems = this._getEventItems(condition)
    if (!eventItems || !eventItems.length) return
    eventItems.forEach(({ name, handler }) => {
      this.el && this.el.addEventListener(name, handler, true)
    })
  }
  /**
   * 清除符合特定条件的事件
   * @param {Object} condition 过滤条件
   * @returns void
   */
  _cleanEvent(condition = {}) {
    const eventItems = this._getEventItems(condition)
    if (!eventItems || !eventItems.length) return
    eventItems.forEach(({ name, handler }) => this.el && this.el.removeEventListener(name, handler, true))
  }
  /**
   * 单步撤销
   *
   * @private
   * @memberof DrawingBoard
   */
  _revoke() {
    if (!this.ctx || !this.revokeStack || !this.revokeStack.length) return
    const { imageData, paintCount: afterRevokePaintCount } = this.revokeStack.pop()
    this.ctx.putImageData(imageData, 0, 0)
    // 恢复绘制次数
    this.paintCount = afterRevokePaintCount
    this.onRevokeStackChange &&
      typeof this.onRevokeStackChange === 'function' &&
      this.onRevokeStackChange(this.revokeStack)
    console.log('_revoke onRevokeStackChange', this.revokeStack, afterRevokePaintCount)
  }
  /**
   * 获取背景图并绘制
   *
   * @private
   * @param {string} bgImgURL 背景图url
   * @memberof DrawingBoard
   */
  _getImgAndDraw(bgImgURL) {
    ;(0, utils_1.getImageFromURL)(bgImgURL)
      .then(image => {
        this._bgImgObject = image
        // 保留原始尺寸，方便旋转时使用
        this.originalSize = [image.width, image.height]
        // TODO:此处存在异步问题，drawBg内部会使用ctx
        this._drawBg(image, this.originalSize[0], this.originalSize[1])
      })
      .catch(err => {
        console.log(err)
        this._bgImgObject = null
      })
  }
  /**
   * 绘制背景底图
   *
   * @private
   * @param {CanvasImageSource} imgObject 图像对象
   * @param {number} w 宽
   * @param {number} h 高
   * @memberof DrawingBoard
   */
  _drawBg(imgObject, w, h) {
    if (!imgObject || !this.ctx || !this.ctx.drawImage || !w || !h || w <= 0 || h <= 0) {
      return
    }
    const sx = 0
    const sy = 0
    const sWidth = w
    const sHeight = h
    const dx = this.bgImgRotate === 0 || this.bgImgRotate === 180 ? -this.width / 2 : -this.height / 2
    const dy = this.bgImgRotate === 0 || this.bgImgRotate === 180 ? -this.height / 2 : -this.width / 2
    const dWidth = this.bgImgRotate === 0 || this.bgImgRotate === 180 ? this.width : this.height
    const dHeight = this.bgImgRotate === 0 || this.bgImgRotate === 180 ? this.height : this.width
    this.ctx.save()
    this.ctx.translate(this.width / 2, this.height / 2)
    this.ctx.rotate((Math.PI / 180) * this.bgImgRotate)
    console.log('旋转参数:', sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight, this.bgImgRotate)
    this.ctx.drawImage(imgObject, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    this.ctx.restore()
  }
  /**
   * 绘制圆形
   *
   * @private
   * @param {number} x 横轴
   * @param {number} y 纵轴
   * @param {number} [radius=3] 半径
   * @param {string} [color='red'] 画笔颜色
   * @memberof DrawingBoard
   */
  _drawCircle(x, y, radius = 3, color = 'red') {
    if (!this.ctx) return
    this.ctx.save()
    this.ctx.fillStyle = color
    this.ctx.beginPath()
    this.ctx.arc(x, y, radius, 0, (Math.PI / 180) * 360, false)
    this.ctx.fill()
    this.ctx.restore()
  }
  /**
   * 绘制移动时的直线
   *
   * @private
   * @param {number} x1 起点x1
   * @param {number} y1 起点y1
   * @param {number} x2 终点x2
   * @param {number} y2 终点y2
   * @param {number} [width=6] 线条宽度
   * @param {string} [color='red'] 线条颜色
   * @memberof DrawingBoard
   */
  _drawLine(x1, y1, x2, y2, width = 6, color = 'red') {
    if (!this.ctx) return
    this.ctx.save()
    this.ctx.strokeStyle = color
    this.ctx.lineWidth = width
    this.ctx.lineCap = 'round'
    this.ctx.lineJoin = 'round'
    this.ctx.beginPath()
    this.ctx.moveTo(x1, y1)
    this.ctx.lineTo(x2, y2)
    this.ctx.stroke()
    this.ctx.restore()
  }
  /**
   * 处理指针开始
   *
   * @private
   * @param {Event} e 事件对象
   * @returns void
   * @memberof DrawingBoard
   */
  _handlePointerStart = e => {
    console.log('_handlePointerStart', e.type)
    if (this.penMode === 'empty') return
    if (this.penMode === 'paint') this._handlePaintStart(e)
    if (this.penMode === 'drag') this._handleDragStart(e)
    this._bindCurInteractiveModeEvents('move')
    this._bindCurInteractiveModeEvents('end')
    this._bindCurInteractiveModeEvents('leave')
  }
  /**
   * 处理绘制开始
   *
   * @private
   * @param {Event} e 事件对象
   * @memberof DrawingBoard
   */
  _handlePaintStart(e) {
    this.isPainting = true
    this.lastPaintPoint = this._getPointOffset(e)
    console.log('handlePaintStart this.lastPaintPoint', e, this.lastPaintPoint)
    // 绘制前保存状态
    this.ctx &&
      this._saveImageData('paint', this.paintCount, this.ctx.getImageData(0, 0, this.width, this.height))
    this._drawCircle(this.lastPaintPoint.x, this.lastPaintPoint.y, this.penWidth / 2, this.penColor)
  }
  /**
   * 处理拖拽开始
   */
  _handleDragStart(e) {
    console.log('drag start')
    this.isDraging = true
    this.lastDragPoint = this._getPointOffset(e)
  }
  /**
   * 处理指针移动
   *
   * @private
   * @param {Event} e 事件对象
   * @returns void
   * @memberof DrawingBoard
   */
  _handlePointerMove = e => {
    console.log('_handlePointerMove')
    if (this.penMode === 'empty') return
    if (this.penMode === 'paint') this._handlePaintMove(e)
    if (this.penMode === 'drag') this._handleDragMove(e)
  }
  /**
   * 处理绘制移动
   */
  _handlePaintMove(e) {
    if (this.isPainting) {
      const { x, y } = this._getPointOffset(e)
      if (this.lastPaintPoint == null) throw new Error(err_msg_1.MSG_LAST_PAINT_POINT_NOT_FOUNT)
      const { x: lastX, y: lastY } = this.lastPaintPoint
      this._drawLine(lastX, lastY, x, y, this.penWidth, this.penColor)
      this.lastPaintPoint = { x, y }
    }
  }
  /**
   * 处理拖拽移动
   *
   * @private
   * @param {(MouseEvent | TouchEvent)} e 事件对象
   * @memberof DrawingBoard
   */
  _handleDragMove(e) {
    console.log('drag move')
    if (this.isDraging) {
      const { x, y } = this._getPointOffset(e)
      if (this.lastDragPoint == null) throw new Error(err_msg_1.MSG_LAST_DRAG_POINT_NOT_FOUNT)
      const { x: lastX, y: lastY } = this.lastDragPoint
      this.dragTransformX += x - lastX
      this.dragTransformY += y - lastY
      this._setCanvasTransform(this.dragTransformX, this.dragTransformY, this.scale)
    }
  }
  /**
   * 处理指针结束
   *
   * @private
   * @param {MouseEvent | TouchEvent} e 事件对象
   * @returns void
   * @memberof DrawingBoard
   */
  _handlePointerEnd = () => {
    console.log('_handlePointerEnd')
    if (this.penMode === 'empty') return
    if (this.penMode === 'paint') this._handlePaintEnd()
    if (this.penMode === 'drag') this._handleDragEnd()
    // 解绑相关事件
    this._cleanCurInteractiveModeEvents({ action: 'move' })
    this._cleanCurInteractiveModeEvents({ action: 'end' })
    this._cleanCurInteractiveModeEvents({ action: 'leave' })
  }
  /**
   * 处理绘制结束
   */
  _handlePaintEnd() {
    this.isPainting = false
    this.paintCount++
    this.onPaintEnd && typeof this.onPaintEnd === 'function' && this.onPaintEnd(this.paintCount)
    console.log('_handlePointerEnd paintCount', this.paintCount)
  }
  /**
   * 处理拖拽结束
   */
  _handleDragEnd() {
    console.log('drag end')
    this.isDraging = false
  }
  /**
   * 处理指针离开
   *
   * @private
   * @param {Event} e 事件对象
   * @returns void
   * @memberof DrawingBoard
   */
  _handlePointerLeave = e => {
    console.log('_handlePointerLeave')
    if (this.isPainting || this.isDraging) this._handlePointerEnd()
  }
  /**
   * 处理指针取消
   *
   * @private
   * @param {Event} e 事件对象
   * @returns void
   * @memberof DrawingBoard
   */
  _handlePointerCancel = e => {
    console.log('_handlePointerCancel')
    if (this.isPainting || this.isDraging) this._handlePointerEnd()
  }
  /**
   * 处理缩放比例改变
   *
   * @private
   * @memberof DrawingBoard
   */
  _handleScaleChange() {
    if (!this.el) return
    this._setCanvasTransform(this.dragTransformX, this.dragTransformY, this.scale, this.scaleTransition)
  }
  /**
   * 设置画笔样式(粗细、颜色)
   *
   * @param {PenStyle} { color, width } 样式
   * @memberof DrawingBoard
   */
  setPenStyle({ color, width }) {
    if (color) this.penColor = this._getPenColor(color)
    if (width) this.penWidth = this._getPenWidth(width)
  }
  /**
   * 设置canvas尺寸
   *
   * @param {number[]} [width, height] 宽高数组
   * @memberof DrawingBoard
   */
  setSize([width, height]) {
    if (width) this.width = width
    if (height) this.height = height
    this._setDOMSize([width, height])
  }
  /**
   * 设置样式名
   *
   * @param {string} name 样式类字符串
   * @memberof DrawingBoard
   */
  setClassName(name) {
    if (!name || !this.el) return
    this.el.className = name
  }
  /**
   * 设置画笔模式为绘制模式
   *
   * @memberof DrawingBoard
   */
  setPenModePaint() {
    this._setPenMode('paint')
  }
  /**
   * 设置画笔模式为拖拽模式
   *
   * @memberof DrawingBoard
   */
  setPenModeDrag() {
    this._setPenMode('drag')
  }
  /**
   * 重置画笔模式为空
   *
   * @memberof DrawingBoard
   */
  setPenModeEmpty() {
    this._setPenMode('empty')
  }
  /**
   * 设置缩放比例
   *
   * @param {*} scale 缩放比例
   * @memberof DrawingBoard
   */
  setScale(scale) {
    let s = parseFloat(scale)
    if (isNaN(s) || s === this.scale) return
    this.scale = this._getLawfulScale(scale)
    this._handleScaleChange()
  }
  /**
   * 挂载
   * @returns void
   */
  mount() {
    if (!this.el) this.el = this._makeCanvas()
    if (!this.ctx) this.ctx = this._getCtx()
    this._setDOMSize([this.width, this.height])
    this.setClassName(this.className)
    this._bindCurInteractiveModeEvents('start')
    this.container.appendChild(this.el)
  }
  /**
   * 销毁
   *
   * @memberof DrawingBoard
   */
  destory() {
    this.el && this.container.removeChild(this.el)
    this.el = null
    this._bgImgObject = null
  }
  /**
   * 清空绘制
   * @returns void
   */
  clear() {
    if (!this.ctx || !this.el) return
    // 清空前保存状态
    this._saveImageData('clear', this.paintCount, this.ctx.getImageData(0, 0, this.width, this.height))
    this.ctx.clearRect(0, 0, this.width, this.height)
    // 重置绘制次数
    this.paintCount = 0
    // 如果有背景图，则需要重新绘制背景图
    this._bgImgObject && this._drawBg(this._bgImgObject, this.originalSize[0], this.originalSize[1])
    console.log('clear paintCount', this.paintCount)
  }
  /**
   * 旋转
   *
   * @param {number} [direction=1] 方向 1顺时针 -1逆时针
   * @memberof DrawingBoard
   */
  rotate(direction = 1) {
    if (![1, -1].includes(direction)) return
    this.bgImgRotate = this._getLawfulRotateAngle(this.bgImgRotate + direction * 90)
    // 重设尺寸，旋转90度，宽高互换即可
    this.setSize([this.height, this.width])
    this._bgImgObject && this._drawBg(this._bgImgObject, this.originalSize[0], this.originalSize[1])
    // 因为旋转操作不记录到撤销栈中
    // 旋转时需要清空撤销栈并重置绘制数量，不然会导致撤销状态错误
    this.paintCount = 0
    this.revokeStack = []
  }
  /**
   * 撤销
   * @returns void
   */
  revoke() {
    this._revoke()
  }
  /**
   * 设置背景
   *
   * @param {(CanvasImageSource | string)} urlOrObject 需要绘制的图像对象(HTMLImageElement、SVGImageElement、HTMLVideoElement、HTMLCanvasElement、ImageBitmap、OffscreenCanvas)或图像url
   * @param {number} originalWidth 原图像宽度。当无法从urlOrObject直接获取原始尺寸时需要手动提供原始尺寸
   * @param {number} originalHeight 原图像高度
   * @memberof DrawingBoard
   */
  setBgImg(urlOrObject, originalWidth, originalHeight) {
    // TODO:此处可能需要保存状态
    if (typeof urlOrObject === 'string') {
      // 从url中获取图片对象
      if (/^(http[s]?)|(data:image)/.test(urlOrObject)) {
        ;(0, utils_1.getImageFromURL)(urlOrObject)
          .then(image => {
            this._bgImgObject = image
            this.originalSize = [originalWidth || image.width, originalHeight || image.height]
            this._drawBg(image, this.originalSize[0], this.originalSize[1])
          })
          .catch(err => {
            console.log(err)
            this._bgImgObject = null
          })
      } else {
        throw new Error(err_msg_1.MSG_BG_URL_NOT_LAWFUL)
      }
    } else {
      // 传入的是新图片对象
      if (urlOrObject !== this._bgImgObject) this._bgImgObject = urlOrObject
      this.originalSize = [originalWidth || this.width, originalHeight || this.height]
      this._drawBg(urlOrObject, this.originalSize[0], this.originalSize[1])
    }
  }
  /**
   * scale + scaleStep
   *
   * @memberof DrawingBoard
   */
  makeScaleAdd() {
    let newScale = this.scale + this.scaleStep
    this.setScale(newScale)
  }
  /**
   * scale - scaleStep
   *
   * @memberof DrawingBoard
   */
  makeScaleSubtract() {
    const newScale = this.scale - this.scaleStep
    this.setScale(newScale)
  }
  /**
   * 重置缩放比例、位置
   *
   * @memberof DrawingBoard
   */
  reset() {
    this.dragTransformX = this.dragTransformY = 0
    this.scale = this.initialScale
    this._setCanvasTransform(this.dragTransformX, this.dragTransformY, this.scale, this.scaleTransition)
  }
  /**
   * 获取当前画面的绘制次数
   *
   * @returns {number} 绘制次数
   * @memberof DrawingBoard
   */
  getPaintCount() {
    return this.paintCount
  }
  /**
   * 获取dataURL
   *
   * @param {IMG_TYPE} [type='png'] 图片类型
   * @param {number} [compressRate=1] 压缩比率
   * @returns dataURL
   * @memberof DrawingBoard
   */
  getDataUrl(type = 'png', compressRate = 1) {
    if (
      !this.el ||
      !DrawingBoard.IMG_TYPE_ENUM.includes(type) ||
      typeof compressRate !== 'number' ||
      isNaN(compressRate)
    ) {
      throw new Error(err_msg_1.MSG_DATAURL_CANT_GEN)
    }
    if (compressRate < 0.3) compressRate = 0.3
    if (compressRate > 1) compressRate = 1
    // ! toDataURL不支持image/jpg类型，若不支持，其会转为image/png
    // ! 在特定情况下，会使图片体积变大
    // ! 正确的应该是image/jpeg
    const resourceType = `image/${type === 'jpg' ? 'jpeg' : type}`
    return this.el.toDataURL(resourceType, compressRate)
  }
  /**
   * 获取Blob
   *
   * @param {IMG_TYPE} [type='png'] 图片类型
   * @param {number} [compressRate=1] 压缩比率
   * @returns {Promise<Blob>} 返回blob
   * @memberof DrawingBoard
   */
  getBlob(type = 'png', compressRate = 1) {
    if (
      !this.el ||
      !DrawingBoard.IMG_TYPE_ENUM.includes(type) ||
      typeof compressRate !== 'number' ||
      isNaN(compressRate)
    ) {
      throw new Error(err_msg_1.MSG_BLOB_CANT_GEN)
    }
    if (compressRate < 0.3) compressRate = 0.3
    if (compressRate > 1) compressRate = 1
    const resourceType = `image/${type}`
    return new Promise((resolve, reject) => {
      this.el &&
        this.el.toBlob(
          blob => {
            if (blob != null) resolve(blob)
          },
          resourceType,
          compressRate
        )
    })
  }
  /**
   * 获取File
   *
   * @param {string} [name='drawingBoard'] 图片名称
   * @param {IMG_TYPE} [type='png'] 图片类型
   * @param {number} [compressRate=1] 压缩比率
   * @returns {(Promise<File | IeCompatibleBlob>)} 返回FIle或IeCompatibleBlob
   * @memberof DrawingBoard
   */
  getFile(name = 'drawingBoard', type = 'png', compressRate = 1) {
    return this.getBlob(type, compressRate).then(blob => (0, file_convert_1.blob2File)(blob, name))
  }
  /**
   * 下载图片
   *
   * @param {IMG_TYPE} [type='png'] 图片类型
   * @param {number} [compressRate=1] 压缩比率，默认原图输出
   * @param {string} [name='drawing-board'] 图片名称
   * @memberof DrawingBoard
   */
  download(type = 'png', compressRate = 1, name = 'drawing-board') {
    if (
      !DrawingBoard.IMG_TYPE_ENUM.includes(type) ||
      typeof compressRate !== 'number' ||
      isNaN(compressRate)
    ) {
      return
    }
    if (compressRate < 0.3) compressRate = 0.3
    if (compressRate > 1) compressRate = 1
    const url = this.getDataUrl(type, compressRate)
    if (url) {
      let link = document.createElement('a')
      document.body.appendChild(link)
      link.href = url
      link.download = `${name}-${new Date().getTime()}`
      link.target = '_blank'
      link.click()
      let timer = setTimeout(() => {
        link && document.body.removeChild(link)
        link = null
        clearTimeout(timer)
        timer = null
      }, 200)
    }
  }
}
exports.default = DrawingBoard
//# sourceMappingURL=index.js.map
