import { ElementRule, IElement, IText, RuleTypeEnum } from '../types'

export type BreakLineProps = {
  cause?: string
}

const NAME = 'BreakLneRule'
const TYPE = 'break-line'

export class BreakLineRule extends ElementRule<BreakLineProps> {
  name: string = NAME
  type: RuleTypeEnum = RuleTypeEnum.ELEMENT
  test(node: Node): boolean {
    return ['BR'].includes(node.nodeName)
  }
  run(node: Node, parents: Node[], children: IText<{}>[]): IElement<BreakLineProps> {
    return {
      type: TYPE,
      props: {},
      children
    }
  }
}
