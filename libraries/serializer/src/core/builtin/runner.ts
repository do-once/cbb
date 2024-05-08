import { IRunner, TextRule, ElementRule, RuleTypeEnum, Rule, IElement, IText } from '../../types'
import { isElementRule, isTextRule } from '../../utils'

type RunnerCreateOptions = {
  elementRules: ElementRule[]
  textRules: TextRule[]
  defaultTextRule: TextRule
  defaultElementRule?: ElementRule
}

export class Runner implements IRunner {
  constructor(
    private elementRules: Set<ElementRule>,
    private textRules: Set<TextRule>,
    private defaultTextRule: TextRule,
    private defaultElementRule?: ElementRule
  ) {}

  static create(opts: RunnerCreateOptions) {
    const instance = new Runner(
      new Set(opts.elementRules),
      new Set(opts.textRules),
      opts.defaultTextRule,
      opts.defaultElementRule
    )

    return instance
  }

  run(nodeOrText: Node, parents: Node[], children: (IElement | IText)[]): IElement[]
  run(nodeOrText: string, parents: Node[]): (IElement | IText)[]
  run(
    nodeOrText: string | Node,
    parents: Node[],
    children?: (IElement | IText)[]
  ): IElement[] | (IElement | IText)[] {
    if (typeof nodeOrText === 'string') {
      return this.texts(nodeOrText, parents)
    } else {
      const matchedRules = this.match(nodeOrText)
      return this.elements(
        nodeOrText,
        parents,
        matchedRules?.length ? matchedRules : this.defaultElementRule ? [this.defaultElementRule] : [],
        children || []
      )
    }
  }

  private texts = (text: string, parents: Node[]): (IElement | IText)[] => {
    if (!text) return []

    const splitTokens = (rules: TextRule[]) => {
      let tokens: string[] = [text]
      for (const rule of rules) {
        tokens = tokens
          .map(t => rule.split(t))
          .flat()
          .filter(/** 过滤空字符串 */ t => !!t)
      }

      return tokens
    }

    const runRules = (tokens: string[]) => {
      let rets: (IElement | IText)[] = []
      for (const token of tokens) {
        const matchedRules = this.match(token)
        /** 未匹配到textRules，则用默认的textRule兜底，默认的textRule一般是提取纯文本的 */
        const rules = matchedRules?.length ? matchedRules : [this.defaultTextRule]
        for (const rule of rules) {
          if (rule.test(token)) rets.push(rule.run(token, parents))
        }
      }

      return rets
    }

    const tokens = splitTokens([...this.match(text), this.defaultTextRule])
    const rets = runRules(tokens)

    return rets
  }

  private elements = (node: Node, parents: Node[], rules: ElementRule[], children: (IElement | IText)[]) => {
    const rule = rules[0]
    return rule ? [rule.run(node, parents, children)] : children
  }

  add(rule: Rule): void {
    if (isElementRule(rule)) this.elementRules.add(rule)
    if (isTextRule(rule)) this.textRules.add(rule)
  }

  match(nodeOrText: Node): ElementRule[]
  match(nodeOrText: string): TextRule[]
  match(nodeOrText: string | Node): ElementRule[] | TextRule[] {
    if (typeof nodeOrText === 'string') {
      return Array.from(this.textRules.values()).filter(r => r.test(nodeOrText))
    } else {
      return Array.from(this.elementRules.values()).filter(r => r.test(nodeOrText))
    }
  }
}
