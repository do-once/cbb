import { ElementRule, IElement, IText, Rule, RuleTypeEnum } from '../types'

export type ParagraphProps = {
  indent?: number
}

const RULE_NAME = 'ParagraphRule'
const TYPE = 'paragraph'

export class ParagraphRule extends ElementRule<ParagraphProps> {
  name = RULE_NAME
  type = RuleTypeEnum.ELEMENT
  test = (node: Node) => {
    return ['P', 'DIV', 'SECTION'].includes(node.nodeName)
  }
  run = (node: Node, parents: Node[], children: (IElement | IText)[]) => {
    return {
      type: TYPE,
      props: {},
      children
    }
  }
}
