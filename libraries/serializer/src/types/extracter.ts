import { IProps } from './props'

export interface IExtracter<R extends IProps> {
  extract(nodeOrText: Node | string, parents: Node[]): R
}
