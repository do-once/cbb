/**
 * @author GuangHui
 * @description 组件相关类型
 */

/** 所有props都是可选的 */
export interface IHelloProps {
  /** 用于组件多实例管理时区分不状态store用 */
  id?: string
  firstName?: string
  lastName?: string

  /** 开关 */
  uppercaseable?: boolean
}

export interface IHelloEmits {
  (event: 'nameChange', name: string): void
}

export interface IBoxSlots extends Record<`box-${string}`, (boxProps: IBoxProps) => any> {}

export interface IListSlots extends Record<`list-${string}`, (listProps: IListProps) => any> {}

export interface IHelloSlots extends IBoxSlots, IListSlots {
  title: () => any
}
