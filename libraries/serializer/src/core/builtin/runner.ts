import { IRunner, RichTextRule, TextRule, ElementRule, RuleTypeEnum, Rule } from '../../types'

export class Runner implements IRunner {
  elementRules: Set<ElementRule> = new Set()
  richTextRules: Set<RichTextRule> = new Set()
  pureTextRules: Set<TextRule> = new Set()

  static create(elementRules: ElementRule[], richTextRules: RichTextRule[], pureTextRules: TextRule[]) {
    const instance = new Runner()

    ;[...elementRules, ...richTextRules, ...pureTextRules].forEach(r => instance.add(r))

    return instance
  }

  run(nodeOrText: string | Node): void {
    const rules = this.find(nodeOrText)

    if (typeof nodeOrText === 'string') {
    } else {
    }
  }

  add(rule) {
    if (rule.type === RuleTypeEnum.ELEMENT) this.elementRules.add(rule)
    if (rule.type === RuleTypeEnum.RICHTEXT) this.richTextRules.add(rule)
    if (rule.type === RuleTypeEnum.TEXT) this.pureTextRules.add(rule)
  }

  find(nodeOrText: string | Node) {
    if (typeof nodeOrText === 'string') {
      const matchedRichTextRules = this.richTextRules.values().filter(r => r.test(nodeOrText))
      return matchedRichTextRules?.length ? matchedRichTextRules : this.pureTextRules.values()
    } else {
      return this.elementRules.values().filter(r => r.test(nodeOrText))
    }
  }
}
