# cbb

Common building block(CBB) powered by [`RushStack`](https://rushstack.io/)


## Monorepo principle with RushStack
- minimizing "boilerplate" files. In other words, consolidating files and settings that would otherwise get copy+pasted into every single project folder in the monorepo. Boilerplate is a nuisance because it's difficult to keep in sync. When a fix is needed, if you have hundreds of projects, you would need to reapply the same fix hundreds of times.
  - 尽量减少 "模板 "文件。换句话说，合并那些在 `monorepo` 中需要复制粘贴到每个项目下的配置文件。让模板保持同步是个麻烦事。一旦需要变动，如果你有百个项目，你需要数百次重复操作。
- principle of project isolation: Each project should build independently and should not become entangled with other projects (for example, by referencing files using relative paths like ../../other-project). This discipline facilitates Rush features like subset builds and incremental builds. It also makes it very easy to move Rush project folders around, to migrate projects between monorepos, and even to stop using Rush later if you change your mind. For this reason, we discourage practices such as putting a centralized .eslintrc.js file in the root of the monorepo and invoking ESLint globally for all projects.
  - 项目隔离原则。每个项目都应该独立构建，而不应该与其他项目纠缠在一起（例如，通过使用诸如 `.../.../other-project` 的相对路径引用文件）。这条原则有助于实现 `Rush` 的子集构建和增量构建功能，甚至当你不想使用 `Rush` 后，它也可以非常轻易地在 `monorepo` 间迁移项目。出于这个原因，我们不鼓励在 `monorepo` 仓库的根目录下放一个 `.eslintrc.js` 文件并让所有项目都借此调用 `ESLint`.


## Directory Structure

### Organizational Principles

- organized with two level, like `Categary/Project`
```bash
# good
.
├── rush.json
├── Categary1
│   ├── ProjectA
│   └── ProjectB
├── Categary2
│   └── ProjectC
├── Categary3
│   ├── ProjectD
│   └── ProjectE
```

### Categary

- [`assets`](./assets)
  - Assets package,`svg`、`img`、`iconfont` etc
  - reviewCategories:`published`
- [`cli`](./cli)
  - Cli package build with `NodeJs`
- [`common`](./common)
  - Common project config `rush config`、`git-hooks` etc
- [`components`](./components)
  - Components package build with `vue2` and `vue3` or other
  - Output `esm` and `umd` format
- [`libraries`](./libraries)
  - Library package build with `es6` or `ts`
  - Only output `esm` format and do not any degrade，so you need transform it to other format and polyfill for other browser
- [`run-control`](./run-control)
  - Shared config package,`.prettierrc`、`.eslintrc`、`.stylelintrc` etc
- [`tools`](./tools)
  - A NodeJS build tool used to compile the other projects
- [`apps`](./apps)
  - A application build with `vue3` and `vite`

### Review Categories
- `production`
  - need deploy to production environment
- `published`
  - need published to npm registry
- `internal`
  - no need to publish,just use in internal

## How to add a new project?
- Just run `rush init-project` to make it happen.

## TODO
- [x] use `vite` to bundle `components` and `libraries`
  - 2022-1113 now `build` and `test` script use `heft`,`vite` just use as development server for `libraries` .`components` no adjustment.
- [x] use `vite` output `.d.ts` for `components`
- [x] add `tools` template
- [x] add `components` template
- [x] add `libraries` template
- [x] add `assets` template
- [x] use `vitest` replace `@heft/jest`
  - 2022-1113 switch back to `@heft/jest` in `libraries` project
- [x] enable [`phase_build`](https://rushjs.io/zh-cn/pages/maintainer/phased_builds/)
- [ ] make project treat `js` as `esm` instead of `cjs`
  - [ ] add `"type":"module"` in `package.json`
- [x] Integrate `vue-demi`
  - [ ] add integrate `vue-demi` project template


## How to publish a package

- `rush change`
- first publish
  - `rush publish --apply --publish --include-all --target-branch main --add-commit-details --set-access-level public`
- other publish
  - `rush publish --apply --target-branch main --publish --set-access-level public`
- Reference
  - https://rushjs.io/zh-cn/pages/commands/rush_publish/
  - https://rushjs.io/zh-cn/pages/maintainer/publishing/
  - https://github.com/microsoft/rushstack/issues/3617#issuecomment-1244117024