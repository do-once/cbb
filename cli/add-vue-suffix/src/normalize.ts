/**
 * @author GuangHui
 * @description 标准化路径
 */

import path from 'path'

export function normalizePath(p: string) {
  if (typeof p !== 'string') throw new TypeError('Path must be a string')

  return p.split(path.sep).join('/')
}
