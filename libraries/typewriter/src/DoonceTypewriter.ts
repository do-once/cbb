/**
 * @author GuangHui
 * @description DoonceTypewriter 主体程序
 */

export interface ITypewriterCreateOptions<T> {
  /** 渲染回调 */
  cb: (messages: T[]) => void
  /** 完成回调 */
  onCompleted?: (...args: any[]) => void
  /** 输出速度ms（间隔） */
  speed?: number
  /** 是否在add时立即启动 */
  immediate?: boolean
}

export class DoonceTypewriter<T> {
  private messages: T[] = []
  private startTimestamp: number = 0
  private isTyping: boolean = false
  private requestId: number | null = null
  private isAllAdded = false

  constructor(
    /** 渲染回调 */
    private readonly renderCallback: (messages: T[]) => void,
    /** 完成回调，在allAdded调用后 && messages全部渲染结束后 触发； */
    private readonly onCompleted: (...args: any[]) => any,
    /** 输出速度ms（间隔） */
    private readonly typingSpeed: number,
    /** 是否在add时立即启动 */
    private readonly immediate: boolean
  ) {}

  /**
   * 静态创建函数
   * @param options 参数
   */
  static create<T>(options: ITypewriterCreateOptions<T>) {
    if (typeof options.cb !== 'function') throw new TypeError('cb function is required!')

    return new DoonceTypewriter<T>(
      options.cb,
      options.onCompleted ?? (() => {}),
      options.speed ?? 1000 / 60,
      options.immediate ?? false
    )
  }

  /**
   * 添加打字内容
   * @param message 添加的信息体
   */
  public add(message: T) {
    this.messages.push(message)
    // 如果需要立即输出，则开始启动输出
    if (this.immediate) this.start()
  }

  /**
   * 开始打字
   */
  public start() {
    if (!this.isTyping) {
      this.isTyping = true
      this.isAllAdded = false
      this.startTimestamp = 0 // 重置开始时间
      this.requestId = window.requestAnimationFrame(this.type.bind(this))
    }
  }

  /**
   * 手动暂停
   */
  public pause() {
    this.isTyping = false
    if (this.requestId !== null) {
      window.cancelAnimationFrame(this.requestId)
      this.requestId = null
    }
  }

  /**
   * 手动停止打字效果
   */
  public stop() {
    this.pause()
    this.reset()
    typeof this.onCompleted === 'function' && this.onCompleted() // 调用停止回调
  }

  /**
   * 重置
   */
  reset() {
    this.messages = []
    this.isTyping = false
    this.isAllAdded = false
    this.requestId = null
  }

  /**
   * 所有要处理的message添加完毕
   */
  allAdded() {
    this.isAllAdded = true
    if (!this.isTyping && this.messages.length === 0 && typeof this.onCompleted === 'function') {
      this.onCompleted()
    }
  }

  /**
   * 打字效果函数
   * @param timestamp 时间戳，由raf自动传入
   * @private
   */
  private type(timestamp: number) {
    if (this.startTimestamp === 0) this.startTimestamp = timestamp
    // 计算过去的时间与打字速度的商(raf在切到后台会暂停，模拟后台继续运行逻辑)
    const speed = Math.floor((timestamp - this.startTimestamp) / this.typingSpeed)

    // 如果速度大于0，并且还有需要打印的字符
    if (speed > 0 && this.messages.length > 0) {
      const printMessages: T[] = []
      for (let i = 0; i < speed && this.messages.length > 0; i++) {
        printMessages.push(this.messages.shift()!)
      }
      this.renderCallback(printMessages) // 调用回调函数进行渲染

      this.startTimestamp = timestamp
    }

    if (this.messages.length === 0) {
      // 没有需要打印的字符 && 要处理的消息全部添加完毕 -> stop
      if (this.isAllAdded) {
        this.stop()
      } else {
        // 没有需要打印的字符 && 要处理的消息未添加完毕 -> pause
        this.pause()
      }
    } else {
      // 如果还有字符需要打印，那么继续请求下一帧的动画
      this.requestId = window.requestAnimationFrame(this.type.bind(this))
    }
  }
}
