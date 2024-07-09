import { effectScope, isRef, toRef, watch } from 'vue'
import { HelloStore, IHelloProps } from '../types'
import { isDef } from '../utils'

export function useWatchProps(props: IHelloProps, store: HelloStore) {
  const scope = effectScope(true)

  const skip: (keyof typeof props)[] = ['id']

  for (const key of Object.keys(props)) {
    const propKey = key as keyof typeof props
    if (!skip.includes(propKey)) {
      const propValue = toRef(() => props[propKey])

      const storeRef = store[propKey as keyof typeof store]

      if (isRef(storeRef)) {
        scope.run(() => {
          watch(
            propValue,
            nextValue => {
              if (isDef(nextValue)) {
                ;(storeRef.value as any) = nextValue
              }
            },
            { immediate: true }
          )
        })
      }
    }
  }

  return () => scope.stop()
}
