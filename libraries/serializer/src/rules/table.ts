import { ElementRule, IElement, IText, RuleTypeEnum, ITableProps, ITableTrProps } from '../types'
import { TablePropsExtracter, TableTcPropsExtracter, TableTrPropsExtracter } from './extracter'

const NAME = 'TableRule'
const TYPE = 'table'
export class TableRule extends ElementRule<ITableProps> {
  name: string = NAME
  type: RuleTypeEnum = RuleTypeEnum.ELEMENT

  test(node: Node): boolean {
    return ['TABLE'].includes(node.nodeName)
  }
  run(node: Node, parents: Node[], children: IElement<ITableTrProps>[]): IElement<ITableProps> {
    return {
      type: TYPE,
      props: new TablePropsExtracter().extract(node, parents),
      children
    }
  }
}

const NAME_ROW = 'TableRowRule'
const TYPE_ROW = 'table-row'
export class TableRowRule extends ElementRule<ITableTrProps> {
  name: string = NAME_ROW
  type: RuleTypeEnum = RuleTypeEnum.ELEMENT
  test(node: Node): boolean {
    return ['TR'].includes(node.nodeName)
  }
  run(node: Node, parents: Node[], children: IElement<TableTcProps>[]): IElement<ITableTrProps> {
    return {
      type: TYPE_ROW,
      props: new TableTrPropsExtracter().extract(node, parents),
      children
    }
  }
}

export type TableTcProps = {}

const NAME_CELL = 'TableCellRule'
const TYPE_CELL = 'table-cell'
export class TableCellRule extends ElementRule<TableTcProps> {
  name: string = NAME_CELL
  type: RuleTypeEnum = RuleTypeEnum.ELEMENT
  test(node: Node): boolean {
    return ['TD', 'TH'].includes(node.nodeName)
  }
  run(node: Node, parents: Node[], children: (IElement<{}> | IText<{}>)[]): IElement<ITableTrProps> {
    return {
      type: TYPE_CELL,
      props: new TableTcPropsExtracter().extract(node, parents),
      children
    }
  }
}
