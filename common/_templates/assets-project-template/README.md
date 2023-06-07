# {{packageName}}

> {{description}}

```bash
.
├── README.md
├── config
│   └── rig.json                    # rig配置文件，使用@doonce/web-rig/profiles/library
├── {{unscopedPackageName}}.build.log              # 构建日志
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
│   ├── {{unscopedPackageName}}.api.json
│   └── {{unscopedPackageName}}.api.md
├── package.json
├── src
│   ├── index.test.ts               # 单元测试文件
│   └── index.ts
├── temp                            # 构建缓存文件
│   └── _eslint-j7qjvp4Y.json
└── tsconfig.json
└── vite.config.js                  # 2022-1113构建、测试交给heft，vite仅做开发服务器使用
```