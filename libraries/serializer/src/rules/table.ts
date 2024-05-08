import { ElementRule, IElement, IText, RuleTypeEnum } from '../types'

export type TableProps = {}
const NAME = 'TableRule'
const TYPE = 'table'
export class TableRule extends ElementRule<TableProps> {
  name: string = NAME
  type: RuleTypeEnum = RuleTypeEnum.ELEMENT

  test(node: Node): boolean {
    return ['TABLE'].includes(node.nodeName)
  }
  run(node: Node, parents: Node[], children: IElement<TableTrProps>[]): IElement<TableProps> {
    return {
      type: TYPE,
      props: {},
      children
    }
  }
}

export type TableTrProps = {}
const NAME_ROW = 'TableRowRule'
const TYPE_ROW = 'table-row'
export class TableRowRule extends ElementRule<TableTrProps> {
  name: string = NAME_ROW
  type: RuleTypeEnum = RuleTypeEnum.ELEMENT
  test(node: Node): boolean {
    return ['TR'].includes(node.nodeName)
  }
  run(node: Node, parents: Node[], children: IElement<TableTcProps>[]): IElement<TableTrProps> {
    return {
      type: TYPE_ROW,
      props: {},
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
  run(node: Node, parents: Node[], children: (IElement<{}> | IText<{}>)[]): IElement<TableTrProps> {
    return {
      type: TYPE_CELL,
      props: {},
      children
    }
  }
}
