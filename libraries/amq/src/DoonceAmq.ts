/**
 * @author GuangHui
 * @description DoonceAmq 主体程序
 */

type HandleMessageFn<T> = (msg: T) => void | Promise<void>

type OnAllDone = (...args: any[]) => void

export interface IAsyncMessageQueueCreateOptions<T> {
  onAllDone?: OnAllDone
  handleMessage: HandleMessageFn<T>
}

export class DoonceAmq<T> {
  private queue: T[] = []
  private isProcessing = false
  /** 消息是否全部添加 */
  private isAllAdded = false

  constructor(private readonly handleMessage: HandleMessageFn<T>, private readonly onAllDone: OnAllDone) {}

  static create<T>({
    /** 消费方法（支持同步或异步方法） */
    handleMessage,
    /** 所有生产端消息添加完毕 && 消费端所有消息消费结束后 触发 */
    onAllDone = () => {}
  }: IAsyncMessageQueueCreateOptions<T>) {
    if (typeof handleMessage !== 'function') throw new Error('handleMessage fn is required.')

    return new DoonceAmq(handleMessage, onAllDone)
  }

  public addMessage(message: T) {
    this.queue.push(message)
    this.processQueue()
  }

  public allMessagesAdded() {
    this.isAllAdded = true
    if (!this.isProcessing && this.queue.length === 0 && this.onAllDone) {
      this.onAllDone()
      this.reset()
    }
  }

  public reset() {
    this.isProcessing = false
    this.isAllAdded = false
    this.queue = []
  }

  private processQueue() {
    if (this.isProcessing) return

    if (this.queue.length === 0) {
      if (this.isAllAdded) {
        if (typeof this.onAllDone === 'function') {
          this.onAllDone()
          this.reset()
        }
      }

      return
    }
    const msg = this.queue.shift()!
    this.isProcessing = true
    /** 串行消费所有消息 */
    Promise.resolve(this.handleMessage(msg))
      .then(() => {
        this.isProcessing = false
        this.processQueue()
      })
      .catch(error => {
        console.log('Failed to handle message:', error)
      })
  }
}
