import type { InjectionKey } from 'vue'
import type { HelloStore, IBoxSlots, IHelloSlots, IListSlots } from '../types'

export const HelloComp: InjectionKey<HelloStore> = Symbol('helloComp')
export const Slots: InjectionKey<Readonly<IHelloSlots>> = Symbol('slots')
// export const BoxSlots: InjectionKey<Readonly<IBoxSlots>> = Symbol('boxSlots')
// export const ListSlots: InjectionKey<Readonly<IListSlots>> = Symbol('ListSlots')
