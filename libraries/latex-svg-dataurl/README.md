# @doonce/latex-svg-dataurl

> This is a library that converts LaTeX strings to SVG dataurl or SVG strings, dataurl can be used with canvas.输入 latex 字符串,输出 svg dataurl或 svg string , dataurl 可供 canvas 消费

```bash
.
├── README.md
├── config
│   └── rig.json                    # rig配置文件，使用@doonce/web-rig/profiles/library
├── latex-svg-dataurl.build.log              # 构建日志
├── dist                            # 输出目录，library仅输出esm格式，且不做任何降级处理
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── index.js.map
│   ├── index.test.d.ts
│   ├── index.test.d.ts.map
│   ├── index.test.js
│   ├── index.test.js.map
│   └── tsdoc-metadata.json         # tsdoc元信息文件，由heft build自动生成，主要被TSDoc库消费
├── dist-commonjs                   # jest使用的中间文件夹，因为 Jest 使用 Node.js 来执行测试，模块格式必须是CommonJS。这在@doonce/web-rig/profiles/library/config/typescript.json中通过additionalModuleKindsToEmit和emitFolderNameForTests字段指定；参考https://rushstack.io/zh-cn/pages/heft_configs/typescript_json/#template
│   ├── index.js
│   ├── index.js.map
│   ├── index.test.js
│   └── index.test.js.map
├── doc-meta                        # heft build时，调用api-extractor生成的产物，.api.md是api报告，.api.json是接口信息，供api-documenter消费
│   ├── latex-svg-dataurl.api.json
│   └── latex-svg-dataurl.api.md
├── package.json
├── src
│   ├── index.test.ts               # 单元测试文件
│   └── index.ts
├── temp                            # 构建缓存文件
│   └── _eslint-j7qjvp4Y.json
└── tsconfig.json
└── vite.config.js                  # 2022-1113构建、测试交给heft，vite仅做开发服务器使用
```

## Installation

```bash
npm i @doonce/latex-svg-dataurl
```

## Usage
- Since this package uses `mathjax@2.7` to render `LaTeX` to `SVG`, you need to reference `mathjax` and configure it to output `TeX-AMS-MML_SVG`. Also, make sure that `window.MathJax` is accessible.
  - For example`<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_SVG"></script>`

```typescript
/** params */
export type TransformLatexToSVGDataUrlParams = {
  latex: string /** latex输入字符串 */
  retryInterval?: number /** 渲染失败的重试间隔,默认500ms */
  retryMaxCount?: number /** 渲染重试次数,默认10次 */
  outputType: 'dataUrl' | 'svgStr' | 'both' /** 输出类型,dataurl svgel 转换的string 或 都输出;默认 dataurl*/
}

/** return */
export type TransformLatexToSVGDataUrlRet =
  | string
  | {
      dataUrl: string
      svgStr: string
    }


import { transformLatexToSVGDataUrl } from '@doonce/latex-svg-dataurl'

const { dataUrl,svgStr } = await transformLatexToSVGDataUrl({latex:'1+\\int_x^y e^x dx + \\ldots',outputType:'both'})
```

- svgStr is use `new XMLSerializer().serializeToString(svg)` to generate
  - If you need to deserialize the svgStr into a DOM node, please use `var ret = new DOMParser().parseFromString(svgStr, 'image/svg+xml')`. Then, you can insert `ret.rootElement` into your desired node.
  - 如果你需要将 svgStr 反序列化为dom 节点,请使用 ` var ret = new DomParser().parserFromString(svgStr,'image/svg+xml')`,然后将`ret.rootElement`插入到节点即可
- dataUrl is generate with `'data:image/svg+xml; charset=utf8, ' + encodeURIComponent(svgStr)`