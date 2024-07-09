import { createEventHook, tryOnScopeDispose } from '@vueuse/core'
import { HelloHooks } from '../types/event'
import { Ref, onBeforeMount } from 'vue'

export function createHooks(): HelloHooks {
  return {
    nameChange: createEventHook(),
    error: createEventHook()
  }
}

export function useHooks(emit: (...args: any[]) => void, hooks: Ref<HelloHooks>) {
  onBeforeMount(() => {
    for (const [key, value] of Object.entries(hooks.value)) {
      const listener = (data: any) => {
        emit(key, data)
      }
      value.on(listener)

      tryOnScopeDispose(() => {
        value.off(listener)
      })
    }
  })
}
