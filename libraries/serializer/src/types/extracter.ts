import { IProps } from './props'

export interface IPropsExtracter<R extends IProps> {
  extract(nodeOrText: Node | string, parents: Node[]): R | void
}
