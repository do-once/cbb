import { IExtracter, PlainTextProps } from '../../types'
import { removeNullishProperties } from '../../utils'
const _set = new Set([
  (parents: Node[]) => {
    if (['STRONG', 'B'].includes(parents.at(-1)?.nodeName || '')) return { bold: 1 }
  },
  (parents: Node[]) => {
    if (['EM', 'I'].includes(parents.at(-1)?.nodeName || '')) return { italic: 1 }
  },
  (parents: Node[]) => {
    const parent = parents.at(-1)
    if (parent instanceof HTMLElement) {
      return {
        fontSize: parent.style.fontSize || null,
        fontFamily: parent.style.fontFamily || null
      }
    }
  }
])

export class PlainTextExtracter implements IExtracter<PlainTextProps> {
  extract(nodeOrText: string | Node, parents: Node[]): PlainTextProps {
    return removeNullishProperties(
      Array.from(_set.values())
        .map(fn => fn(parents))
        .reduce<PlainTextProps>((props, cur) => Object.assign(props, cur), {})
    )
  }
}
