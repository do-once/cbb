import { IPropsExtracter, ITableProps, ITableTcProps, ITableTrProps, TableBorders } from '../../types'
import { removeNullishProperties } from '../../utils'

const uppercase = (str: string) =>
  (str[0].toUpperCase() + str.slice(1)) as Capitalize<'top' | 'right' | 'bottom' | 'left'>

export class TablePropsExtracter implements IPropsExtracter<ITableProps> {
  extract(nodeOrText: string | Node, parents: Node[]): ITableProps {
    if (nodeOrText instanceof HTMLElement) {
      const style = nodeOrText.style

      const width = nodeOrText.getAttribute('width') || style?.width

      const dirs = ['top', 'right', 'bottom', 'left'] as const
      const borders = dirs.reduce((acc, dir) => {
        acc[dir] = {
          sz: style[`border${uppercase(dir)}Width`],
          color: style[`border${uppercase(dir)}Color`],
          style: style[`border${uppercase(dir)}Style`]
        }

        return acc
      }, {} as TableBorders)

      const layout = style.tableLayout === 'fixed' ? 'fixed' : 'auto'

      return removeNullishProperties({
        width,
        borders,
        layout
      })
    } else {
      return {}
    }
  }
}

export class TableTrPropsExtracter implements IPropsExtracter<ITableTrProps> {
  extract(nodeOrText: string | Node, parents: Node[]): ITableTrProps {
    // empty
    return {}
  }
}

export class TableTcPropsExtracter implements IPropsExtracter<ITableTcProps> {
  extract(nodeOrText: string | Node, parents: Node[]): ITableTcProps {
    if (nodeOrText instanceof HTMLElement) {
      const style = nodeOrText.style

      const dirs = ['top', 'right', 'bottom', 'left'] as const
      const borders = dirs.reduce((acc, dir) => {
        acc[dir] = {
          sz: style[`border${uppercase(dir)}Width`],
          color: style[`border${uppercase(dir)}Color`],
          style: style[`border${uppercase(dir)}Style`]
        }

        return acc
      }, {} as TableBorders)

      const gridSpan = Number(nodeOrText.getAttribute('colspan'))
      const rowSpan = Number(nodeOrText.getAttribute('rowspan'))

      return removeNullishProperties({
        borders,
        gridSpan,
        rowSpan,
        vMerge: rowSpan > 1 ? 'restart' : void 0
      })
    } else {
      return {}
    }
  }
}
