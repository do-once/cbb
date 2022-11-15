# common

- 公用模块（跨`project`共享资源，项目配置、`git hooks` 等）

```bash
.
├── _templates                            # rush-init-project-plugin模版存放目录
├── autoinstallers                        # 自动安装器，可用来声明、安装一些shell脚本需要的依赖
│   ├── rush-plugins                      # rush init-autoinstaller --name rush-plugins,专门声明和安装rush插件
│   └── rush-prettier                     # rush init-autoinstaller --name rush-prettier,专门声明和安装prettier依赖，参考https://rushjs.io/zh-cn/pages/maintainer/enabling_prettier/
├── config                                # 项目配置目录
│   ├── custom                            # 用户自定义配置
│   └── rush                              # rush相关配置
├── git-hooks                             # git钩子
├── scripts                               # rush自带的一些脚本
└── temp                                  # 临时产物目录
```
