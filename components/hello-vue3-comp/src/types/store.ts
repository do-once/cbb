/**
 * @author GuangHui
 * @description 状态相关类型
 */

import { IHelloProps } from './hello'
import { HelloHooks, HelloHooksEmit, HelloHooksOn } from './event'
import { ComputedRef, ToRefs } from 'vue'

export interface IState extends Omit<IHelloProps, 'id'> {
  /** -----props转化的state----- */
  /** props转化为state时，应该给所有可选props赋予初始值 */
  firstName: string
  lastName: string

  /** -----非props转化的state----- */
  /** head 引用 */
  headRef: HTMLDivElement | null
  /** 事件hook，可以在内部手动调用 */
  readonly hooks: HelloHooks
  /** 标记是否已经初始化 */
  initialized: boolean
}

/** getter名:返回值 */
export interface IGetters {
  getName: string
}

export type ComputedGetters = {
  [key in keyof IGetters]: ComputedRef<IGetters[key]>
}

export interface IActions {
  setState: (
    state: Partial<IHelloProps & IState> | ((state: IState) => Partial<IHelloProps & IState>)
  ) => void

  updateFirstName: (firstName: string) => void
  updateLastName: (lastName: string) => void
}

/** 对外暴露的完整store */
export type HelloStore = {
  readonly id: string
  readonly emits: HelloHooksEmit

  /** 当前版本 */
  readonly helloCompVersion: string
} & HelloHooksOn &
  ToRefs<IState> &
  Readonly<ComputedGetters> &
  Readonly<IActions>
