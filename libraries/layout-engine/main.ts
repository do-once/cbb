/**
 * @author GuangHui
 * @description example 入口
 */

import { createApp } from 'vue'
import {
  DoonceLayoutEngine,
  FormulaRenderTypeEnum,
  LayoutItemTypeEnum,
  ImgSurrounTypeEnum,
  ImgLayoutItemDesc,
  RowLayoutItemDesc
} from './src/'
import { DoonceHtmlParser, IToken } from '@doonce/html-parser'
import { measureImgSize } from '@doonce/utils'

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

const tempForHtml = `<div>
<div style="position:relative;width: 500px; height: 800px; outline: 1px solid blue; font-size:16px;font-family:'syst';">

  <div class="row" v-for='row in layoutList' :style="{display:'flex',alignItems:'center',outline:'1px solid pink',width:row.width+'px',height:row.height+'px',lineHeight:row.height+'px'}">
    <template v-for='c in row.childs'>
      <span  v-if="c.layoutItemType === 'CHAR'" v-text="c.content"></span>
      <img v-if="c.layoutItemType === 'FORMULA'" :src="c.content"  />
      <span v-if="c.layoutItemType === 'IMG_PLACEHOLDER'" :style="{width:c.width+'px',height:c.height+'px'}"></span>
    </template>
  </div>
  <img v-for="img in imgList" :src="img.src" :style="{position:'absolute',left:img.x+'px',top:img.y+'px',outline: '1px solid green'}"/>
</div>
<button type="button" @click="start" style="position:fixed;left:50vw;top:50vh;">start</button>
</div>`

const tempForAbsolute = `<div style="width: 500px; height: 800px; outline: 1px solid blue; position: relative;font-size:16px;line-height:20px;font-family:'syst'">
<div
  v-for="row in layoutList"
  class="row"
  :style="{position: 'absolute',left:row.x+'px',top:row.y+'px',outline:'1px solid pink',width:row.width+'px',height:row.height+'px',lineHeight:row.height+'px',width:row.width+'px'}"
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
    <img
    v-if="c.layoutItemType === 'GRAPH'"
    :style="{position: 'absolute',left:c.x+'px',top:c.y+'px'}"
    :src="c.src"
  />
  </template>
</div>
<img v-for="img in imgList" :src="img.src" :style="{position:'absolute',left:img.x+'px',top:img.y+'px',outline: '1px solid green'}"/>

<button type="button" @click="start" style="position:fixed;left:50vw;top:50vh;">start</button>
</div>`
const app = {
  template: tempForAbsolute,
  data() {
    return {
      layoutListOrObj: {}
    }
  },
  computed: {
    layoutList() {
      return Array.isArray(this.layoutListOrObj) ? this.layoutListOrObj : this.layoutListOrObj.rowList
    },
    imgList() {
      return Array.isArray(this.layoutListOrObj) ? [] : this.layoutListOrObj.imgList
    }
  },
  methods: {
    async start() {
      const htmlStrArr = [
        `<span>计算\\(1\\times 3\\times\\dfrac{1}{3}\\times(-2)\\)的结果是\\((\\quad)\\)</span>`,
        `<span>已知一个数的绝对值为\\(5\\)，另一个数的绝对值为\\(3\\)，且两数之积为负，则两数之差为 __________.</span>`,
        `<span>已知\\(A\\)，\\(B\\)，\\(C\\)是数轴上的三个点，点\\(A\\)，\\(B\\)表示的数分别是\\(1\\)，\\(3\\)，如图所示\\(.\\)<p>此文本前需要换行;</p>若\\(BC=2AB\\)，则点\\(C\\)表示的数是__________.</span>\n`,
        `<span>如图，在点\\(M\\)，\\(N\\)，\\(P\\)，\\(Q\\)中，一次函数\\(y=kx+2\\left(k < 0\\right)\\)的图象不可能经过的点是\\((\\quad)\\)</span>
    <p><img bigger="https://bj.download.cycore.cn/question/2018/6/29/11/56/75af1d99-789f-4813-b444-df783dbe6bc4.png" h="126pxpx" src="https://static.zhixue.com/zhixue.png" w="121pxpx" style="width: 120px; height: 126px;;max-width:100%;display:inline-block;vertical-align:middle;" height="126" data-cke-saved-src="http://bj.download.cycore.cn/question/2018/6/29/11/56/d160b798-ff47-4ae9-b25d-6a7284dc7de6.png"/>这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本</p>`,
        `<span>计算\\(-2 \\times (-3)\\)的结果是\\((\\quad)\\)</span>`,
        `<span>小明积极配合小区进行垃圾分类，并把可回收物拿到废品收购站回收换钱，这样既保护了环境，又可以为自己积攒一些零花钱．如表是他\\(12\\)月份的部分收支情况\\((\\)单位：元\\().\\)</span>
        <table border="1px solid" style="max-width: 98%;">
         <tbody>
          <tr>
           <td width="65">日期</td>
           <td width="65">收入\\((+)\\)或支出\\((-)\\)</td>
           <td width="65">结余</td>
           <td width="163">备注</td>
          </tr>
          <tr>
           <td>\\(1\\)日</td>
           <td>\\(4.5\\)</td>
           <td>\\(17.5\\)</td>
           <td>卖可回收物</td>
          </tr>
          <tr>
           <td>\\(5\\)日</td>
           <td>\\(-20\\)</td>
           <td>\\(-2.5\\)</td>
           <td>买书，不足部分由妈妈代付</td>
          </tr>
         </tbody>
        </table>
        <p>其中表格中“\\(-2.5\\)”表示的是\\((\\quad)\\)</p>`,
        `<span class="head">下列说法正确的有\\((\\quad)\\)</span>
        <p>①正有理数是正整数和正分数的统称；<img src="/assets/small.png" />②整数是正整数和负整数的统称；③有理数是正整数、负整数、正分数、负分数的统称；④\\(0\\)是偶数，但不是自然数；⑤偶数包括正偶数、负偶数和零．</p><img src="/assets/big.png" />`
      ]

      // TODO 公式中的&lt;等特殊字符需要处理
      const REG_FORMULA = /(\\\(.+?\\\))/

      /** 解析html */
      const input = htmlStrArr[2]
      console.log('input :>> ', input)

      const hp = new DoonceHtmlParser()
      const tokenList = hp.parse(input)
      console.log('tokenList :>> ', tokenList)
      const ast = hp.parseTokenListToAst(tokenList)
      console.log('ast :>> ', ast)
      /** 解析html end */

      /** 过滤文本&换行标签&图片src */
      const filteredTokenList = tokenList.filter((token, index, arr) => {
        return (
          /** 非空文本 */
          (token.type === 'TEXT' && !/^\s+$/.test(token.content)) ||
          /** 换行标签 */
          (token.type === 'TAG_NAME' && ['p', 'br', 'div'].includes(token.content)) ||
          /** 图片 */
          (token.type === 'TAG_ATTR_TEXT' &&
            /src=["'](.+?)["']/.test(token.content) &&
            arr[index - 1] &&
            arr[index - 1].type === 'TAG_NAME' &&
            arr[index - 1].content === 'img')
        )
      })

      console.log('filteredTokenList :>> ', filteredTokenList)
      /** 过滤文本&换行标签&图片src end */

      /** 创建 layoutItemDesc */
      const getCharDescObj = (content: string) => {
        return { layoutItemType: LayoutItemTypeEnum.CHAR, rawContent: content } as RowLayoutItemDesc
      }
      const getFormulaDescObj = (content: string) => {
        return {
          layoutItemType: LayoutItemTypeEnum.FORMULA,
          rawContent: content
        } as RowLayoutItemDesc
      }
      const getCRLFDescObj = () => {
        return {
          layoutItemType: 'CRLF',
          rawContent: ''
        } as RowLayoutItemDesc
      }
      const getGraphDescObj = (content: string) => {
        const matched = content.match(/src="(.+?)"/)
        return {
          layoutItemType: LayoutItemTypeEnum.GRAPH,
          rawContent: matched ? matched[1] : ''
        } as RowLayoutItemDesc
      }

      let descList: (RowLayoutItemDesc | Pick<ImgLayoutItemDesc, 'layoutItemType' | 'rawContent'>)[] = []
      filteredTokenList.forEach(token => {
        if (token.type === 'TAG_ATTR_TEXT') {
          descList.push(getGraphDescObj(token.content))
        } else if (token.type === 'TAG_NAME') {
          descList.push(getCRLFDescObj())
        } else {
          /** 切分公式 */
          /** 按公式标识\\\(.+?\\\)拆分并保留分隔符正则中的捕获组 */
          /** 参考:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split#使用_regexp_来分割使结果中包含分割符 */
          const splitedTextListByFormulaReg = token.content.split(REG_FORMULA)

          const charAndFormulaDescList = splitedTextListByFormulaReg.reduce<RowLayoutItemDesc[]>(
            (acc, cur) => {
              const matched = cur.match(/^\\\((.+?)\\\)$/)

              let tempList: RowLayoutItemDesc[] =
                matched && matched.length
                  ? /** 创建 formula desc 对象 */
                    [getFormulaDescObj(matched[1])]
                  : /** 将字符串切分为字符,创建char desc对象 */
                    cur.split('').map(getCharDescObj)

              return acc.concat(tempList)
            },
            []
          )
          descList = descList.concat(charAndFormulaDescList)
        }
      })

      console.log('descList :>> ', descList)
      /**  创建layoutItemDesc end */

      /** 通过图片尺寸,判断哪些是题干中的图片(width<=50),哪些非题干图片 */
      const maybeGraphDescList = descList.filter(desc => desc.layoutItemType === 'GRAPH')
      const graphDescWithSize = await Promise.all(
        maybeGraphDescList.map(async desc => {
          const { width, height } = await measureImgSize(desc.rawContent)
          return {
            ...desc,
            width,
            height
          }
        })
      )

      const widthOver50Graph = graphDescWithSize.filter(desc => desc.width >= 50)
      const rowLayoutItemDescList = descList.filter((desc): desc is RowLayoutItemDesc => {
        return !widthOver50Graph.map(g => g.rawContent).includes(desc.rawContent)
      })
      const tempImgLayoutItemDescList = descList.filter(
        (desc): desc is Pick<ImgLayoutItemDesc, 'rawContent' | 'layoutItemType'> => {
          return widthOver50Graph.map(g => g.rawContent).includes(desc.rawContent)
        }
      )
      const imgLayoutItemDescList = tempImgLayoutItemDescList.map(desc => {
        return {
          ...desc,
          imgSurroundType: ImgSurrounTypeEnum.FLOAT
        }
      })

      console.log('rowLayoutItemDescList :>> ', rowLayoutItemDescList)
      console.log('imgLayoutItemDescList :>> ', imgLayoutItemDescList)

      const le = new DoonceLayoutEngine({
        globalFontConfig: {
          fontSize: 16,
          fontFamily: 'syst',
          lineHeight: 24,
          fontStyle: 'normal',
          fontWeight: 'normal',
          fontVariant: 'normal',
          /** 字体加载地址,和@font-face 中的声明格式一样 */
          source: 'url(/fonts/SourceHanSerif-VF.ttf.ttc)'
        },
        rowLayoutItemDescList,
        imgLayoutItemDescList,
        formulaRenderType: FormulaRenderTypeEnum.IMG,
        debug: true
      })

      await le.init()

      const layoutListOrObj = le.layout({
        maxWidth: 500,
        padding: [10, 10, 10, 10],
        letterSpacing: 2
      })
      console.log('layoutListOrObj :>> ', layoutListOrObj)

      this.layoutListOrObj = layoutListOrObj
    }
  }
}

createApp(app).mount('#app')
