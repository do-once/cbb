/**
 * @author GuangHui
 * @description example 入口
 */

import { createApp } from 'vue'
import {
  DoonceLayoutEngine,
  FormulaRenderTypeEnum,
  LayoutItemTypeEnum,
  InputImgLayouItemInstance,
  InputRowLayoutItemInstance,
  CRLF,
  Char,
  Formula,
  ImgSurrounTypeEnum,
  Img
} from './src/'
import { DoonceHtmlParser } from '@doonce/html-parser'
import { RowLayoutItemGroup } from './src/layout-item/RowLayoutItemGroup'

const tempForHtml = `<div>
<div style="position:relative;width: 500px; height: 800px; outline: 1px solid blue; font-size:16px;font-family:'syst';">

  <div class="row" v-for='row in rowList' :style="{display:'flex',alignItems:'center',outline:'1px solid pink',width:row.width+'px',height:row.height+'px',lineHeight:row.height+'px'}">
    <template v-for='c in row.childs'>
      <span  v-if="c.layoutItemType === 'CHAR'" v-text="c.content"></span>
      <img v-if="c.layoutItemType === 'FORMULA'" :src="c.content"  />
      <span v-if="c.layoutItemType === 'IMG_PLACEHOLDER'" :style="{width:c.width+'px',height:c.height+'px'}"></span>
    </template>
  </div>
  <img v-for="img in imgList" :src="img.content" :style="{position:'absolute',left:img.x+'px',top:img.y+'px',outline: '1px solid green'}"/>
</div>
<button type="button" @click="start" style="position:fixed;left:50vw;top:50vh;">start</button>
</div>`

const tempForAbsolute = `<div style="width: 500px; height: 800px; outline: 1px solid blue; position: relative;font-size:16px;line-height:24px;font-family:'syst'">
<div
  v-for="row in rowList"
  class="row"
  :style="{position: 'absolute',left:row.x+'px',top:row.y+'px',outline:'1px solid pink',width:row.width+'px',height:row.height+'px',width:row.width+'px'}"
>
  <template v-for="c in row.childs">
    <span
      v-if="c.layoutItemType === 'CHAR'"
      v-text="c.content"
      :style="{position: 'absolute',left:c.x+'px',top:c.y+'px'}"
    ></span>
    <span
      v-if="c.layoutItemType === 'IMG_PLACEHOLDER'"
      :style="{position: 'absolute',left:c.x+'px',top:c.y+'px',width:c.width+'px',height:c.height+'px','background-color':'red'}"
    ></span>
    <img
      v-if="c.layoutItemType === 'FORMULA'"
      :style="{position: 'absolute',left:c.x+'px',top:c.y+'px'}"
      :src="c.content"
    />
    <img
    v-if="c.layoutItemType === 'IMG'"
    :style="{position: 'absolute',left:c.x+'px',top:c.y+'px'}"
    :src="c.content"
    />

    <template v-if="c.layoutItemType === 'ROW_LAYOUT_ITEM_GROUP'">
      <span :style="{position: 'absolute',left:c.x+'px',top:c.y+'px'}">
        <template v-for="groupChild in  c.childs">
          <span v-if="groupChild.layoutItemType === 'CHAR'" v-text="groupChild.content" :style="{position:'absolute',top:groupChild.y+'px',left:groupChild.x+'px'}"></span>
          <img  v-if="groupChild.layoutItemType === 'FORMULA'" :src="groupChild.content" :style="{position:'absolute',top:groupChild.y+'px',left:groupChild.x+'px'}"/>
          <img  v-if="groupChild.layoutItemType === 'IMG'" :src="groupChild.content" :style="{position:'absolute',top:groupChild.y+'px',left:groupChild.x+'px'}"/>
        </template>
      </span>
    </template>
  </template>
</div>

 
  <div v-for="img in imgList" :style="{position:'absolute',left:img.x+'px',top:img.y+'px',outline: '1px solid green',width:img.width+'px',height:img.height+'px'}">
    <img :src="img.content" style="display:block;"/>
    <p v-if="img.title" v-text="img.title" style="margin:0;text-align:center"></p>
  </div>
 
  <div style="position:fixed;left:50vw;top:50vh;">
    <button type="button" @click="init" >init</button>
    <button type="button" @click="dragImg.x+=10">img.x+10</button>
    <button type="button" @click="dragImg.x-=10">img.x-10</button>
    <button type="button" @click="dragImg.y+=10">img.y+10</button>
    <button type="button" @click="dragImg.y-=10">img.y-10</button>
    <button type="button" @click="layout()">layout</button>
  </div>

</div>`

const htmlStrArr = [
  `<span>计算\\(1\\times 3\\times\\dfrac{1}{3}\\times(-2)\\)的结果是\\((\\quad)\\)</span>`,
  `<span>已知一个数的绝对值为\\(5\\)，另一个数的绝对值为\\(3\\)，且两数之积为负，则两数之差为 __________.</span>`,
  `<span>已知\\(A\\)，\\(B\\)，\\(C\\)是数轴上的三个点，点\\(A\\)，\\(B\\)表示的数分别是\\(1\\)，\\(3\\)，如图所示\\(.\\)<p>此文本前需要换行;</p>若\\(BC=2AB\\)，则点\\(C\\)表示的数是__________.</span>\n`,
  `<span>如图，在点\\(M\\)，\\(N\\)，\\(P\\)，\\(Q\\)中，一次函数\\(y=kx+2\\left(k < 0\\right)\\)的图象不可能经过的点是\\((\\quad)\\)</span>
<p><img src="/assets/big2.png"/>我这需要换行 这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本这是一个测试文本</p>`,
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
  <p>①正有理数是正整数和正分数的统称；<img src="/assets/small.png" />②整数是正整数和负整数的统称；③有理数是正整数、负整数、正分数、负分数的统称；④\\(0\\)是偶数，但不是自然数；⑤偶数包括正偶数、负偶数和零．</p><img src="/assets/big2.png" />`,
  `<span>规定“\\(*\\)”表示一种运算，且\\(a*b=3a-2ab\\)，则\\(3*\\left(4*\\dfrac{1}{2}\\right)=\\)__________.</span><img src="/assets/big2.png" />`
]

const GLOBAL_FONT_CONFIG = {
  fontSize: 16,
  fontFamily: 'syst',
  lineHeight: 24,
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontVariant: 'normal',
  /** 字体加载地址,和@font-face 中的声明格式一样 */
  source: 'url(/fonts/SourceHanSerif-VF.ttf.ttc)'
}

const IMG_MAX_WIDTH = 50

const SYMBOL_HANGE = ['，', '；', '．', '、']

// TODO 公式中的&lt;等特殊字符需要处理
const REG_FORMULA = /(\\\(.+?\\\))/

const app = {
  template: tempForAbsolute,
  data() {
    return {
      layoutObj: {},
      dragImg: null
    }
  },
  computed: {
    rowList() {
      return this.layoutObj.rowList
    },
    imgList() {
      return this.layoutObj.imgList
    }
  },
  methods: {
    async init() {
      /** 解析html */
      const input = htmlStrArr[7]
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

      /** 创建 instance */
      const getCharInstance = (content: string) =>
        new Char({ rawContent: content, globalFontConfig: GLOBAL_FONT_CONFIG, rowNo: -1 })

      const getFormulaInstance = (content: string) =>
        new Formula({
          rawContent: content,
          globalFontConfig: GLOBAL_FONT_CONFIG,
          formulaRenderType: FormulaRenderTypeEnum.IMG,
          rowNo: -1
        })

      const getImgInstance = (content: string) => {
        const matched = content.match(/src="(.+?)"/)

        return new Img({
          rawContent: matched ? matched[1] : '',
          globalFontConfig: GLOBAL_FONT_CONFIG,
          imgSurroundType: ImgSurrounTypeEnum.NONE,
          rowNo: -1
        })
      }

      let inputInstanceList: (InputImgLayouItemInstance | InputRowLayoutItemInstance)[] = []

      filteredTokenList.forEach(token => {
        if (token.type === 'TAG_ATTR_TEXT') {
          inputInstanceList.push(getImgInstance(token.content))
        } else if (token.type === 'TAG_NAME') {
          inputInstanceList.push(new CRLF({ because: token.content, rowNo: -1 }))
        } else {
          /** 切分公式 */
          /** 按公式标识\\\(.+?\\\)拆分并保留分隔符正则中的捕获组 */
          /** 参考:developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String/split#使用_regexp_来分割使结果中包含分割符 */
          const splitedTextListByFormulaReg = token.content.split(REG_FORMULA)

          const charAndFormulaInstanceList = splitedTextListByFormulaReg.reduce<(Char | Formula)[]>(
            (acc, cur) => {
              const matched = cur.match(/^\\\((.+?)\\\)$/)

              let tempList: (Char | Formula)[] =
                matched && matched.length
                  ? /** 创建 formula desc 对象 */
                    [getFormulaInstance(matched[1])]
                  : /** 将字符串切分为字符,创建char desc对象 */
                    cur.split('').map(getCharInstance)

              return acc.concat(tempList)
            },
            []
          )
          inputInstanceList = inputInstanceList.concat(charAndFormulaInstanceList)
        }
      })

      console.log('inputInstanceList :>> ', inputInstanceList)
      /**  创建instance end */

      /** 过滤出图片并获取尺寸 */
      const graphAndGraphWithTitleInstanceList = inputInstanceList.filter(
        (instance): instance is InputImgLayouItemInstance =>
          instance.layoutItemType === LayoutItemTypeEnum.IMG
      )

      await Promise.all(graphAndGraphWithTitleInstanceList.map(instance => instance.init()))

      /** 通过图片尺寸,判断哪些是题干中的图片(width<=50),哪些非题干图片 */
      const inputImgLayoutItemInstanceList = graphAndGraphWithTitleInstanceList.filter(
        instance => instance.getSize().width > IMG_MAX_WIDTH
      )

      /** 筛选出所有参与行排版的实例 */
      const rowLayoutItemInstanceList = inputInstanceList.filter(
        (instance): instance is InputRowLayoutItemInstance =>
          ![LayoutItemTypeEnum.IMG].includes(instance.layoutItemType) ||
          instance.getSize().width <= IMG_MAX_WIDTH
      )

      /** 将逗号和前一个 item 绑定,实现类似标点悬挂效果 */
      const inputRowLayoutItemInstanceList: InputRowLayoutItemInstance[] = []
      for (let i = 0, curInstance, nextInstance; i < rowLayoutItemInstanceList.length; i++) {
        curInstance = rowLayoutItemInstanceList[i]
        nextInstance = rowLayoutItemInstanceList[i + 1]

        if (nextInstance && SYMBOL_HANGE.includes(nextInstance.rawContent)) {
          inputRowLayoutItemInstanceList.push(
            new RowLayoutItemGroup({ childs: [curInstance, nextInstance], rowNo: -1 })
          )
          i++
        } else {
          inputRowLayoutItemInstanceList.push(curInstance)
          continue
        }
      }

      console.log('inputRowLayoutItemInstanceList :>> ', inputRowLayoutItemInstanceList)
      console.log('inputImgLayoutItemInstanceList :>> ', inputImgLayoutItemInstanceList)

      this.inputRowLayoutItemInstanceList = inputRowLayoutItemInstanceList
      this.inputImgLayoutItemInstanceList = inputImgLayoutItemInstanceList

      /** 调试图片,添加标题,调整位置*/
      const img = this.inputImgLayoutItemInstanceList[0]
      this.dragImg = img
      if (img) {
        img.title = '测试标题'
        img.imgSurroundType = ImgSurrounTypeEnum.FLOAT
        // img.setPos({ x: 160, y: 0 })
        /** 因为前面为了判断哪些是非题干的图片,已经调过 init 获取过尺寸,所以此处需要重新强制初始化一次 */
        await img.init(true)
      }

      this.le = new DoonceLayoutEngine({
        globalFontConfig: GLOBAL_FONT_CONFIG,
        debug: true,
        inputImgLayoutItemInstanceList: this.inputImgLayoutItemInstanceList,
        inputRowLayoutItemInstanceList: this.inputRowLayoutItemInstanceList
      })

      await this.le.init()
    },
    async layout() {
      const layoutObj = this.le.layout({ maxWidth: 500 })
      console.log('layoutObj :>> ', layoutObj)

      this.layoutObj = layoutObj
    }
  }
}

createApp(app).mount('#app')
