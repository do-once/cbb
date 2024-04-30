import { ElementRule, RichTextRule, Rule, TextRule } from './rule'

export interface IRunner {
  elementRules: Set<ElementRule>
  richTextRules: Set<RichTextRule>
  pureTextRules: Set<TextRule>

  add(rule: Rule): void
  run(nodeOrText: Node | string): void
  find<P extends Node | string>(nodeOrText: P): P extends Node ? ElementRule[] : (RichTextRule | TextRule)[]
}
