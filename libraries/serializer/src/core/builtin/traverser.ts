import { ITraverser, INode, IElement } from '../../types'

export class Traverser implements ITraverser {
  static create = () => {
    const instance = new Traverser()

    return instance
  }

  run = (node: Node | Node[]) => {
    const nodes = Array.isArray(node) ? node : [node]

    const rets: INode[] = []

    for (const n of nodes) {
      switch (n.nodeType) {
        case Node.ELEMENT_NODE:
          this.handleElement(n)
          break
        case Node.TEXT_NODE:
          this.handleText(n)
          break
        default:
          this.run(Array.from(n.childNodes))
          break
      }
    }

    return rets
  }

  private handleElement = (n: Node) => {
    /** 先处理子节点 */
    const children = this.run(Array.from(n.childNodes))
  }

  private handleText = (n: Node) => {}
}

const dfs = () => {}
