# @doonce/num2chn

> Convert a number to chinese

```bash
.
├── README.md
├── config
│   └── rig.json                    # rig配置文件，使用@doonce/web-rig/profiles/library
├── num2chn.build.log              # 构建日志
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
│   ├── num2chn.api.json
│   └── num2chn.api.md
├── package.json
├── src
│   ├── index.test.ts               # 单元测试文件
│   └── index.ts
├── temp                            # 构建缓存文件
│   └── _eslint-j7qjvp4Y.json
└── tsconfig.json
└── vite.config.js                  # 2022-1113构建、测试交给heft，vite仅做开发服务器使用
```

## How to use
```javascript
import Num2Chn from '@doonce/num2chn'

const instance= new Num2Chn()

instance.transform(123)
```

## Demos

```js
import Num2Chn from '@doonce/num2ch'

const instance = new Num2Chn()

/* default options */
// 默认参数
{
  unitChars:['', '十', '百', '千'], // 节内权位
  sectionUnitChars: ['', '万', '亿', '万亿', '亿亿'], // 节权位
  numChars:['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'], // 数字映射表
  dotChar:'点', // 小数点
  signChar:'负' // 符号
}

instance.transform(123) // 一百二十三
instance.transform(0) // 零
instance.transform(0.0) // 零
instance.transform(-0.3) // 负零点三
instance.transform(0.3) // 零点三
instance.transform(0.3333333333333333333) // 零点三三三三三三三三三三三三三三三三
instance.transform(1) // 一
instance.transform(2) // 二
instance.transform(10) // 十
instance.transform(11) // 十一
instance.transform(20) // 二十
instance.transform(23) // 二十三
instance.transform(301) // 三百零一
instance.transform(123456) // 十二万三千四百五十六
instance.transform(123.456789) // 一百二十三点四五六七八九
instance.transform(-123.456789) // 负一百二十三点四五六七八九
instance.transform(123456789.987654321) // 一亿二千三百四十五万六千七百八十九点九八七六五四三三
instance.transform(1000) // 一千
instance.transform(10000) // 一万
instance.transform(100000) // 十万
instance.transform(1000000) // 一百万
instance.transform(10000000) // 一千万
instance.transform(100000000) // 一亿
instance.transform(1000000000) // 十亿
instance.transform(10000000000) // 一百亿
instance.transform(100000000000) // 一千亿
instance.transform(1000000000000) // 一万亿
instance.transform(10000000000000) // 十万亿
instance.transform(100000000000000) // 一百万亿
instance.transform(1000000000000000) // 一千万亿
instance.transform(-1000000000000000) // 负一千万亿
instance.transform(-1000000000000000.123123) // 负一千万亿点一
instance.transform(10000000000000000) // 无法解析成数字或超出范围
```