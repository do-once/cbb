import { ElementRule, Rule, RuleTypeEnum, TextRule } from '../types'

export const isElementRule = (rule: Rule): rule is ElementRule => rule.type === RuleTypeEnum.ELEMENT
export const isTextRule = (r: Rule): r is TextRule => r.type === RuleTypeEnum.TEXT
