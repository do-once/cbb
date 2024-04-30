import { ElementRule, Rule, RuleTypeEnum } from '../types'

const NAME = 'ParagraphRule'

export class ParagraphRule extends ElementRule {
  name = NAME
  type = RuleTypeEnum.ELEMENT
}
