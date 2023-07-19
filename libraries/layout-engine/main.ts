/**
 * @author GuangHui
 * @description example 入口
 */

import { createApp } from 'vue'
import { DoonceLayoutEngine, Formula, Char, FormulaRenderTypeEnum } from './src/'
import { DoonceHtmlParser } from '@doonce/html-parser'

const htmlStrArr = [
  `<span>计算\\(1\\times 3\\times\\dfrac{1}{3}\\times(-2)\\)的结果是\\((\\quad)\\)</span>`,
  `<span>已知一个数的绝对值为\\(5\\)，另一个数的绝对值为\\(3\\)，且两数之积为负，则两数之差为 __________.</span>`,
  `<span>已知\\(A\\)，\\(B\\)，\\(C\\)是数轴上的三个点，点\\(A\\)，\\(B\\)表示的数分别是\\(1\\)，\\(3\\)，如图所示\\(.\\)若\\(BC=2AB\\)，则点\\(C\\)表示的数是__________.</span>\n<p><img src="/img-test.png" style="height: 49px; width: 200px; float: right;" /></p>`
]

const REG_FORMULA = /(\\\(.+?\\\))/
const globalFontOptions = {
  fontSize: 16,
  fontFamily: 'syst',
  lineHeight: 20,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontVariant: 'normal',
  /** 字体加载地址,和@font-face 中的声明格式一样 */
  source: 'url(/fonts/SourceHanSerif-VF.ttf.ttc)'
}

/** 解析html */
const input = htmlStrArr[2]
console.log('object :>> ', input)

const hp = new DoonceHtmlParser()
const output = hp.parse(input)
console.log('output :>> ', output)
/** 解析html end */

/** 过滤文本和图片 src */
const text = output.filter(
  token => token.type === DoonceHtmlParser.State.TEXT && !/^\s+$/.test(token.content)
)
const img = output
  .map((token, index, arr) => {
    if (token.content === 'src') {
      return arr[index + 1]
    }
  })
  .filter(item => !!item)

console.log('text :>> ', text)
console.log('img :>> ', img)
/** 过滤文本和图片 src end */

/** 切分公式 */
/** 按公式标识(\\\(.+?\\\))拆分并保留分隔符正则中的捕获组 */
/** 参考:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split#使用_regexp_来分割使结果中包含分割符 */
const flatedText = text.map(t => t.content.split(REG_FORMULA)).flat()

console.log('flatedText :>> ', flatedText)
/** 切分公式 end */

/** 实例化文本对象 */
const instancedTextObj = flatedText.reduce<(Char | Formula)[]>((acc, cur) => {
  const matched = cur.match(/^\\\((.+?)\\\)$/)

  let maybeFormulaOrCharArr: Formula | Char[] = []
  if (matched && matched.length) {
    /** 捕获公式分隔符中的内容交给 Formula 渲染 */
    maybeFormulaOrCharArr = new Formula({
      rawContent: matched[1],
      globalFontOptions,
      /** 使用canvas 渲染,需要将公式svg转换为 dataUrl */
      formulaRenderType: FormulaRenderTypeEnum.IMG,
      debug: false
    })
  } else {
    /** 将字符串切分为字符,实例化 Char 对象 */
    maybeFormulaOrCharArr = cur.split('').map(c => new Char(c, globalFontOptions))
  }

  return acc.concat(maybeFormulaOrCharArr)
}, [])

console.log('instancedTextObj :>> ', instancedTextObj)
/** 实例化文本对象 end */

/** 初始化对象 */
await Promise.all(instancedTextObj.map(instance => instance.init()))
/** 初始化对象 end */

const le = new DoonceLayoutEngine({
  globalFontOptions: {
    fontSize: 16,
    fontFamily: 'syst',
    lineHeight: 20,
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontVariant: 'normal',
    /** 字体加载地址,和@font-face 中的声明格式一样 */
    source: 'url(/fonts/SourceHanSerif-VF.ttf.ttc)'
  }
})

const app = {
  template: `<div>
    <h1>DoonceLayoutEngine Example</h1>
    </div>`,
  data() {
    return {
      le
    }
  },
  mounted() {
    const layoutList = le.layout({
      maxWidth: 500,
      padding: [10, 10, 10, 10],
      letterSpacing: 2
    })
  }
}

createApp(app).mount('#app')
