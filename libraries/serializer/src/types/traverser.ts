import { INode } from './tree'

export interface ITraverser {
  run(node: Node | Node[]): INode[]
}
