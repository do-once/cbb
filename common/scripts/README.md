# common/scripts

- 脚本

```bash
.
├── README.md
├── install-run-rush.js         # CI构建时安装并运行rush的脚本（直接使用npm安装，会使防止幻影依赖失效）；https://rushjs.io/zh-cn/pages/maintainer/enabling_ci_builds/#install-run-rush.js 来启动 Rush
├── install-run-rushx.js        # CI构建时安装rushx的脚本
└── install-run.js              # 可用此脚本来执行任意的 NPM 包；https://rushjs.io/zh-cn/pages/maintainer/enabling_ci_builds/#install-run.js 来执行其他命令
```