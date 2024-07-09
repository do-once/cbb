import { computed } from 'vue'
import { ComputedGetters, IState } from '../types'

export function useGetters(state: IState): ComputedGetters {
  const getName: ComputedGetters['getName'] = computed(() => (state.firstName ?? '') + (state.lastName ?? ''))

  return {
    getName
  }
}
