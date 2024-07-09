/**
 * @author GuangHui
 * @description 事件相关类型，参考createEventHook实现
 * https://vueuse.org/shared/createEventHook/
 */

import type { EventHook, EventHookOn, EventHookTrigger } from '@vueuse/core'

/** 事件type:事件参数> */
export interface IHelloEvents {
  nameChange: string
  error: any
}

/** 完整的事件map */
export type HelloHooks = Readonly<{
  [key in keyof IHelloEvents]: EventHook<IHelloEvents[key]>
}>

/** 对外暴露的 onXxx hooks，如onNameChange */
export type HelloHooksOn = Readonly<{
  [key in keyof IHelloEvents as `on${Capitalize<key>}`]: EventHookOn<IHelloEvents[key]>
}>

/** 抛出的事件 */
export type HelloHooksEmit = Readonly<{
  [key in keyof IHelloEvents]: EventHookTrigger<IHelloEvents[key]>
}>
