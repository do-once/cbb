/**
 * @author GuangHui
 * @description bin
 */

import path from 'path'

import { argv } from './arg'
import { err } from './log'
import { run } from './index'

let resolveConfig = {}

try {
  // @ts-ignore
  const { resolve } = require(path.join(process.cwd(), argv.resolveConfig))

  resolveConfig = resolve
} catch (error) {
  err('get an error when try to resolve resolveConfig', error)
}

run({
  resolveConfig,
  // @ts-ignore
  patterns: argv.patterns,
  // @ts-ignore
  debug: argv.debug,
  // @ts-ignore
  withAST: argv.withAST
})
