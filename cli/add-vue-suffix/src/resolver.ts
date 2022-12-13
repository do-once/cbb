/**
 * @author GuangHui
 * @description 路径解析器(webpack)
 */

import { create } from 'enhanced-resolve'

function factory(likeWebpackResolveConfig: unknown) {
  return create.sync(likeWebpackResolveConfig)
}

export const createMyResolver = factory
