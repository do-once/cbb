import { toRefs } from '@vueuse/core'
import { getCurrentInstance, reactive } from 'vue'
import type { HelloStore, IHelloProps } from '../types'
import { useActions, useGetters, useState } from '../store'

/**
 * Stores all existing VueFlow state instances
 */
export class Storage {
  public currentId = 0
  public helloComps = new Map<string, HelloStore>()
  static instance: Storage

  public static getInstance(): Storage {
    // todo: this is just a workaround for now, in the next major this class won't exist and the state will be ctx-based (like React Provider)
    const vueApp = getCurrentInstance()?.appContext.app

    const existingInstance = vueApp?.config.globalProperties.$vueFlowStorage ?? Storage.instance

    Storage.instance = existingInstance ?? new Storage()

    if (vueApp) {
      vueApp.config.globalProperties.$vueFlowStorage = Storage.instance
    }

    return Storage.instance
  }

  public set(id: string, helloComp: HelloStore) {
    return this.helloComps.set(id, helloComp)
  }

  public get(id: string) {
    return this.helloComps.get(id)
  }

  public remove(id: string) {
    return this.helloComps.delete(id)
  }

  public create(id: string, preloadedState?: IHelloProps): HelloStore {
    const state = useState()

    const reactiveState = reactive(state)

    /** 挂载hooksOn */
    const hooksOn = <any>{}
    for (const [n, h] of Object.entries(reactiveState.hooks)) {
      const name = `on${n.charAt(0).toUpperCase() + n.slice(1)}`
      hooksOn[name] = h.on
    }

    /** 挂载emit */
    const emits = <any>{}
    for (const [n, h] of Object.entries(reactiveState.hooks)) {
      emits[n] = h.trigger
    }

    const getters = useGetters(reactiveState)

    const actions = useActions(reactiveState)

    actions.setState({ ...reactiveState, ...preloadedState })

    const helloComp: HelloStore = {
      ...hooksOn,
      ...getters,
      ...actions,
      ...toRefs(reactiveState),
      emits,
      id,
      $destroy: () => {
        this.remove(id)
      }
    }

    this.set(id, helloComp)

    return helloComp
  }

  public getId() {
    return `hello-comp-${this.currentId++}`
  }
}
