# common/git-hooks

- `git`钩子

## 如何使钩子生效

> `rush`中的`git hook`使用请参考：[https://rushjs.io/zh-cn/pages/maintainer/git_hooks/](https://rushjs.io/zh-cn/pages/maintainer/git_hooks/)

- 在 common/git-hooks 目录下添加该文件，并在 Git 上提交。
- 当开发者执行 rush install 时，Rush 将会拷贝该文件到 .git/hooks/commit-msg 目录下。
- 当你执行 git commit 时，Git 讲找到该脚本并调用它。
