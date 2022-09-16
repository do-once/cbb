# @doonce/greeting

> A library to test rush build library

```bash
.
├── README.md
├── config
│   └── rig.json                    # rig配置文件，使用@doonce/web-rig/profiles/library
├── greeting.build.log              # 构建日志
├── lib                             # 输出目录
│   ├── index.d.ts
│   ├── index.d.ts.map
│   ├── index.js
│   ├── index.js.map
│   ├── index.test.d.ts
│   ├── index.test.d.ts.map
│   ├── index.test.js
│   └── index.test.js.map
├── lib-commonjs                    # jest使用的中间文件夹，因为 Jest 使用 Node.js 来执行测试，模块格式必须是CommonJS。这在@doonce/web-rig/profiles/library/config/typescript.json中通过additionalModuleKindsToEmit和emitFolderNameForTests字段指定；参考https://rushstack.io/zh-cn/pages/heft_configs/typescript_json/#template
│   ├── index.js
│   ├── index.js.map
│   ├── index.test.js
│   └── index.test.js.map
├── package.json
├── src
│   ├── index.test.ts
│   └── index.ts
├── temp                            # 构建缓存文件
│   └── _eslint-j7qjvp4Y.json
└── tsconfig.json
```