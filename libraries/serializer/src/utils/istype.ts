import { ElementRule, Rule, RuleTypeEnum, TextRule } from '../types'

export const isElementRule = (rule: Rule): rule is ElementRule => rule.type === RuleTypeEnum.ELEMENT
export const isTextRule = (rule: Rule): rule is TextRule => rule.type === RuleTypeEnum.TEXT
