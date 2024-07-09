/**
 * @author GuangHui
 * @description 主composable方法
 */

import { EffectScope, getCurrentInstance, getCurrentScope, inject, provide } from 'vue'
import type { HelloStore, IHelloProps } from '../types'
import { HelloComp } from '../context'
import { Storage } from '../utils'

type Injection = HelloStore | null | undefined
type Scope = (EffectScope & { helloCompId: string }) | undefined

export function useHello(id?: string): HelloStore
export function useHello(Opts?: IHelloProps): HelloStore
export function useHello(idOrOpts?: any): HelloStore {
  const storage = Storage.getInstance()

  const scope = getCurrentScope() as Scope

  const isOptsObj = typeof idOrOpts === 'object'

  const options = isOptsObj ? idOrOpts : { id: idOrOpts }

  const id = options.id
  const helloCompId = scope?.helloCompId || id

  let helloComp: Injection

  /** 在当前scope中能通过inject得到HelloStore，这应该是初始化后的常规逻辑 */
  if (scope) {
    const injection = inject(HelloComp, null)
    if (typeof injection !== 'undefined' && injection !== null) {
      helloComp = injection
    }
  }

  /** 无法通过inject得到HelloStore，尝试用id查找 */
  if (!helloComp) {
    if (helloCompId) {
      helloComp = storage.get(helloCompId)
    }
  }

  /** 通过id查找不到或inject找到的HelloStore的id和需要的不同，则创建一个 */
  if (!helloComp || (helloComp && id && id !== helloComp.id)) {
    const name = id ?? storage.getId()

    const state = storage.create(name, options)

    helloComp = state
  } else {
    /** inject找到，则传入了对象参数，则重设状态 */
    if (isOptsObj) {
      helloComp.setState(options)
    }
  }

  /** 提供一个新鲜的store给后代 */
  if (scope) {
    provide(HelloComp, helloComp)

    scope.helloCompId = helloComp.id
  }

  if (isOptsObj) {
    const instance = getCurrentInstance()

    /** 检测是否在HelloComp中 */
    if (instance?.type.name !== 'HelloComp') {
      helloComp.emits.error('is not in HelloComp')
    }
  }

  return helloComp
}
