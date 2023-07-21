/**
 * @author GuangHui
 * @description example 入口
 */

import { createApp } from 'vue'
import {
  DoonceLayoutEngine,
  Formula,
  Char,
  FormulaRenderTypeEnum,
  InputLayoutItemDesc,
  LayoutItemTypeEnum
} from './src/'
import { DoonceHtmlParser, IToken } from '@doonce/html-parser'
import { getCssFontDesc } from '@doonce/utils'

const htmlStrArr = [
  `<span>计算\\(1\\times 3\\times\\dfrac{1}{3}\\times(-2)\\)的结果是\\((\\quad)\\)</span>`,
  `<span>已知一个数的绝对值为\\(5\\)，另一个数的绝对值为\\(3\\)，且两数之积为负，则两数之差为 __________.</span>`,
  `<span>已知\\(A\\)，\\(B\\)，\\(C\\)是数轴上的三个点，点\\(A\\)，\\(B\\)表示的数分别是\\(1\\)，\\(3\\)，如图所示\\(.\\)若\\(BC=2AB\\)，则点\\(C\\)表示的数是__________.</span>\n<p><img src="/img-test.png" style="height: 49px; width: 200px; float: right;" /></p>`,
  `<span>如图，在点\\(M\\)，\\(N\\)，\\(P\\)，\\(Q\\)中，一次函数\\(y=kx+2\\left(k < 0\\right)\\)的图象不可能经过的点是\\((\\quad)\\)</span>
<p><img bigger="https://bj.download.cycore.cn/question/2018/6/29/11/56/75af1d99-789f-4813-b444-df783dbe6bc4.png" h="126pxpx" src="http://bj.download.cycore.cn/question/2018/6/29/11/56/d160b798-ff47-4ae9-b25d-6a7284dc7de6.png" w="121pxpx" style="width: 120px; height: 126px;;max-width:100%;display:inline-block;vertical-align:middle;" height="126" data-cke-saved-src="http://bj.download.cycore.cn/question/2018/6/29/11/56/d160b798-ff47-4ae9-b25d-6a7284dc7de6.png" /></p>`
]

// TODO 公式中的&lt;等特殊字符需要处理

const REG_FORMULA = /(\\\(.+?\\\))/

/** 解析html */
const input = htmlStrArr[3]
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
  .map((token, index, arr) => (token.content === 'src' ? arr[index + 1] : null))
  .filter(item => !!item) as IToken[]

console.log('text :>> ', text)
console.log('img :>> ', img)
/** 过滤文本和图片 src end */

/** 切分公式 */
/** 按公式标识\\\(.+?\\\)拆分并保留分隔符正则中的捕获组 */
/** 参考:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split#使用_regexp_来分割使结果中包含分割符 */
const flatedText = text.map(t => t.content.split(REG_FORMULA)).flat()

console.log('flatedText :>> ', flatedText)
/** 切分公式 end */

let inputLayoutItemDescList = flatedText.reduce<InputLayoutItemDesc[]>((acc, cur) => {
  const matched = cur.match(/^\\\((.+?)\\\)$/)

  let tempList: InputLayoutItemDesc[] = []
  if (matched && matched.length) {
    tempList = [
      {
        layoutItemType: LayoutItemTypeEnum.FORMULA,
        rawContent: matched[1]
      }
    ]
  } else {
    /** 将字符串切分为字符,实例化 Char 对象 */
    tempList = cur.split('').map(c => ({ layoutItemType: LayoutItemTypeEnum.CHAR, rawContent: c }))
  }

  return acc.concat(tempList)
}, [])

// TODO 临时不考虑有图片场景
// inputLayoutItemDescList = inputLayoutItemDescList.concat(
//   img.map(i => ({ layoutItemType: LayoutItemTypeEnum.GRAPH, rawContent: i?.content }))
// )

console.log('inputLayoutItemDescList :>> ', inputLayoutItemDescList)

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
  },
  inputLayoutItemDescList,
  formulaRenderType: FormulaRenderTypeEnum.IMG
})

await le.init()

const layoutList = le.layout({
  maxWidth: 500,
  padding: [10, 10, 10, 10],
  letterSpacing: 2
})
console.log('layoutList :>> ', layoutList)

// canvas 渲染
// const canvas = document.getElementById('stage') as HTMLCanvasElement
// const ctx = canvas.getContext('2d')!
// ctx.font = getCssFontDesc({
//   fontSize: 16,
//   fontFamily: 'Microsoft YaHei',
//   lineHeight: 20,
//   fontStyle: 'normal',
//   fontWeight: 'normal',
//   fontVariant: 'normal'
// })

// layoutList!.forEach(row => {
//   const { x, y, childs } = row
//   childs.forEach(c => {
//     if (c.layoutItemType === LayoutItemTypeEnum.CHAR) {
//       ctx.fillText(c.content, x + c.x, y + c.y + c.height)
//     } else {
//       const img = new Image()
//       img.src = c.content
//       img.onload = () => {
//         ctx.drawImage(img, c.x, y + c.y)
//       }
//     }
//   })
// })

const temp1 = `<div>
<h1>DoonceLayoutEngine Example</h1>
<div style="width: 800px; height: 800px; border: 1px solid blue; font-size:16px;line-height:20px;font-family:'syst'">
  <div class="row" v-for='row in layoutList' :style="{display:'flex',alignItems:'center',border:'1px solid pink',width:row.width+'px',height:row.height+'px'}">
    <template v-for='c in row.childs'>
      <span  v-if="c.layoutItemType === 'CHAR'" v-text="c.content"></span>
      <img v-if="c.layoutItemType === 'FORMULA'" :src="c.content"  />
    </template>
  </div>
</div>
</div>`

const temp2 = `<div style="width: 800px; height: 800px; border: 1px solid blue; position: relative;font-size:16px;line-height:20px;font-family:'syst'">
<div
  v-for="row in layoutList"
  class="row"
  :style="{position: 'absolute',left:row.x+'px',top:row.y+'px',border:'1px solid pink',width:row.width+'px',height:row.height+'px'}"
>
  <template v-for="c in row.childs">
    <span
      v-if="c.layoutItemType === 'CHAR'"
      v-text="c.content"
      :style="{position: 'absolute',left:c.x+'px',top:c.y+'px'}"
    ></span>
    <img
      v-if="c.layoutItemType === 'FORMULA'"
      :style="{position: 'absolute',left:c.x+'px',top:c.y+'px'}"
      :src="c.content"
    />
  </template>
</div>
</div>`
const app = {
  template: temp2,
  data() {
    return {
      layoutList
    }
  }
}

createApp(app).mount('#app')
