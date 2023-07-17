'use strict'
/**
 * @author GuangHui
 * @description requestAnimationFrame动画
 */
Object.defineProperty(exports, '__esModule', { value: true })
exports.rafAnim = void 0
const raf_1 = require('./raf')
/**
 *
 * requestAnimationFrame动画
 * @export
 * @param {Function} frameFn 步进函数，需要返回一个布尔值
 * @param {Object} context frameFn的执行上下文
 */
function rafAnim(frameFn, context) {
  // requestAnimationFrame的递归调用的启动函数
  var isEnd = false,
    RAFId = -1
  ;(function rafLoop() {
    // 通过具名自执行函数，完成requestAnimationFrame的递归调用，frameFn需要返回动画是否完成的标志量
    isEnd = frameFn.call(context)
    RAFId = (0, raf_1.raf)(rafLoop)
    if (isEnd) {
      ;(0, raf_1.caf)(RAFId)
    }
  })()
}
exports.rafAnim = rafAnim
//# sourceMappingURL=raf-animation.js.map
