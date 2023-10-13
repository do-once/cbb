/**
 * @author GuangHui
 * @description DoonceMathjaxWrapper 主体程序
 */

declare global {
  interface Window {
    MathJax: any
  }
}

import { loadJs } from '@doonce/utils'

export class DoonceMathJaxWrapper {
  static _instance = null as unknown as DoonceMathJaxWrapper

  js: string = ''
  isLoading = false
  pendingQueue: { resolve: (value: any) => void; reject: (reason?: any) => void; id: string }[] = []

  /**
   * MathJaxWrapper构造函数
   *
   * @date 2023-05-20 14:13:45
   * @constructor
   * @param {Object} opts 入参，包含js字段，默认指向'https://cdn.jsdelivr.net/npm/mathjax@2.7.0/MathJax.js?config=TeX-AMS_CHTML'
   * @memberof DoonceMathJaxWrapper
   * @example
   // 自定义mathjax资源地址
   const mj = new DoonceMathJaxWrapper({js:"https://cdn.jsdelivr.net/npm/mathjax@2.7.0/MathJax.js?config=TeX-AMS_CHTML"})
   */
  constructor({ js = 'https://cdn.jsdelivr.net/npm/mathjax@2.7.0/MathJax.js?config=TeX-AMS_CHTML' } = {}) {
    if (DoonceMathJaxWrapper._instance) return DoonceMathJaxWrapper._instance

    if (typeof js !== 'string') throw new Error('js can not be empty')

    this.js = js
    this.isLoading = false
    this.pendingQueue = []

    return (DoonceMathJaxWrapper._instance = this)
  }

  /**
   * 加载mathjax
   *
   * @date 2023-05-20 14:16:12
   * @private
   * @return {Promise}  Promise实例
   * @memberof DoonceMathJaxWrapper
   */
  _load() {
    return loadJs(this.js)
  }

  /**
   * 设置mathjax config
   *
   * @date 2023-05-20 14:16:41
   * @private
   * @return {void}  无返回
   * @memberof DoonceMathJaxWrapper
   */
  _setMathJaxConfig() {
    if (!window.MathJax || !window.MathJax.Hub || !window.MathJax.Hub.Config)
      return Promise.reject('window.MathJax.Hub.Config not exist')

    window.MathJax.Hub.processSectionDelay = 10

    window.MathJax.Hub.Config({
      showProcessingMessages: false,
      messageStyle: 'none',
      showMathMenu: false,
      CommonHTML: {
        showMathMenu: false,
        styles: {
          '.mjx-chtml': {
            padding: '5px 2px',
            'font-size': '100% !important',
            outline: 'none'
          },
          '.mjx-charbox': { width: '50% !important' },
          '.mjx-chtml[tabindex]:focus, body :focus .mjx-chtml[tabindex]': {
            display: 'inline-block'
          }
        },
        scale: 50
      }
    })

    return true
  }

  /**
   * 内部渲染方法(渲染对应id节点)
   *
   * @date 2023-05-20 14:17:09
   * @private
   * @param {string} id 目标节点id
   * @return {Object} typeset返回值
   * @memberof DoonceMathJaxWrapper
   */
  _render(id: string, cb: unknown) {
    return window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub, id], cb)
  }

  /**
   * 执行等待队列
   *
   * @date 2023-05-19 15:15:29
   * @private
   * @param {Object} opt 立即reject对象，包含immediateReject、immediateRejectErr字段
   * @property immediateReject 默认为false
   * @property immediateRejectErr 自定义injected错误
   * @return {void} 无返回
   * @memberof DoonceMathJaxWrapper
   */
  _run(
    { immediateReject = false, immediateRejectErr } = {} as {
      immediateReject: boolean
      immediateRejectErr: unknown
    }
  ) {
    if (!this.pendingQueue || !this.pendingQueue.length) return Promise.resolve()

    while (this.pendingQueue.length) {
      const { resolve, reject, id } = this.pendingQueue.shift()!
      if (immediateReject) {
        reject(immediateRejectErr)
      } else {
        try {
          this._render(id, () => {
            console.log('jj')
            resolve('jj')
          })
        } catch (error) {
          reject(error)
        }
      }
    }
  }

  /**
   * 包装过的渲染函数
   *
   * @date 2023-05-19 15:15:54
   * @public
   * @instance
   * @param {string} id 目标节点id
   * @return {Promise} Promise实例
   * @fulfil 渲染成功，无返回
   * @reject error
   * @memberof DoonceMathJaxWrapper
   * @example
   * const wp = document.querySelector('#mathjax-wp')
   * wp.innerHTML = '\frac{AC}{DF}'
   *
   * const mathjax = new DoonceMathJaxWrapper()
   * mathjax.render('mathjax-wp')
   * .then(()=>{
   *  console.log('渲染成功')
   * })
   */
  render(id: string) {
    return new Promise((resolve, reject) => {
      if (!id) return reject(new Error('id can not be empty'))

      if (window.MathJax) {
        this._render(id, () => {
          console.log('jjj')
          resolve('jj')
        })
      } else {
        this.pendingQueue.push({ resolve, reject, id })

        if (!this.isLoading) {
          this.isLoading = true

          this._load()
            .then(() => {
              this._setMathJaxConfig()
              this.isLoading = false

              this._run()
            })
            .catch(err => {
              console.log('load mathjax err', err)
              this.isLoading = false

              // load失败，需要触发等待队列中的reject，以执行后续流程
              this._run({
                immediateReject: true,
                immediateRejectErr: err
              })
            })
        }
      }
    })
  }
}
