import type { IState } from '../types'
import { createHooks } from './hooks'

/** 初始状态 */
export function useState(): IState {
  return {
    firstName: '',
    lastName: '',
    headRef: null,
    hooks: createHooks(),
    uppercaseable: false
  }
}
