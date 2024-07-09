import { IActions, IState } from '../types'
import { isDef } from '../utils'

export function useActions(state: IState): IActions {
  const updateFirstName: IActions['updateFirstName'] = firstName => {
    state.firstName = firstName

    state.hooks.nameChange.trigger(state.firstName + state.lastName)
  }

  const updateLastName: IActions['updateLastName'] = lastName => {
    state.lastName = lastName

    state.hooks.nameChange.trigger(state.firstName + state.lastName)
  }

  const setState: IActions['setState'] = options => {
    const opts = typeof options === 'function' ? options(state) : options

    /** 这些在初始化后不应该被重新设置 */
    const exclude: (keyof typeof opts)[] = ['hooks', 'headRef']

    for (const o of Object.keys(opts)) {
      const key = o as keyof IState
      const option = opts[key]

      if (!exclude.includes(key) && isDef(option)) {
        ;(<any>state)[key] = option
      }
    }
  }

  return {
    updateFirstName,
    updateLastName,
    setState
  }
}
