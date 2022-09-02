# common/config/rush

- `rush`相关配置存储目录
- 文档参考：`https://rushjs.io/zh-cn/pages/configs/environment_vars/`
```bash
.
├── README.md
├── .npmrc                              # 安装阶段npm配置，Rush 使用该文件来配置安装阶段的 NPM 源
├── .npmrc-publish                      # 发布阶段npm配置
├── .pnpmfile.csj                       # pnpm hook配置文件
├── artifactory.json                    # 该配置项用于管理 Rush 和 JFrog Artifactory 服务集成（实验）
├── browser-approved-packages.json      # rush install 生成的浏览器审查文件
├── build-cache.json                    # 该配置项用于管理 Rush 的构建缓存功能（实验）
├── command-line.json                   # 该配置项配置 "rush" 的自定义command
├── common-versions.json                # 该配置项用于配置 NPM 依赖版本，它会影响 Rush 仓库内的所有项目。
├── deploy.json                         # 这个配置文件约定了使用 "rush deploy" 时的部署场景
├── experiments.json                    # 该配置文件允许仓库开启或禁止某些实验性的功能。
├── nonbrowser-approved-packages.json   # rush install 生成的非浏览器审查文件
├── pnpm-lock.yaml                      # pnpm lock文件
├── repo-state.json                     # rush内部使用状态文件，不要修改，需commit到仓库
├── rush-plugins.json                   # 该配置文件用来配置rush的一些插件（实验）
├── rush-plugin-manifest.json           # 创建rush plugin pkg时描述插件pkg提供的哪些插件
├── rush-project.json                   # 用来给仓库内的某个项目单独设置一些配置 Rush-specific（实验）
└── version-policies.json               # 该配置文件用于使用 Rush 发布时的高级配置（版本发布策略）
```