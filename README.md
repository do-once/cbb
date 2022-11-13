# cbb

common building block(CBB)

## TOC

- [`assets`](./assets)
  - Assets package,`svg`、`img`、`iconfont` etc
  - `published`
- [`cli`](./cli)
  - Cli package build with `NodeJs`
  - `published`
- [`common`](./common)
  - Common project config `rush config`、`git-hooks` etc
  - `inner`
- [`components`](./components)
  - Components package build with `vue2` and `vue3` or other
  - Output `esm` and `umd` format
  - `published`
- [`libraries`](./libraries)
  - Library package build with `es6` or `ts`
  - Only output `esm` format and do not any degrade，so you need transform it to other format and polyfill for other browser
  - `published`
- [`run-control`](./run-control)
  - Shared config package,`.prettierrc`、`.eslintrc`、`.stylelintrc` etc
  - `published`
- [`tools`](./tools)
  - A NodeJS build tool used to compile the other projects
  - `internal`
- [`apps`](./apps)
  - A application build with `vue3` and `vite`
  - `internal`


## How to add a new project?
- Just run `rush init-project` to make it happen.

## TODO
- [x] use `vite` to bundle `components` and `libraries`
  - 2022-1113 now `build` and `test` script use `heft`,`vite` just use as development server for `libraries` .`components` no adjustment.
- [x] use `vite` output `.d.ts` for `components`
- [x] add `tools` template
- [x] add `components` template
- [x] add `libraries` template
- [x] use `vitest` replace `@heft/jest`
