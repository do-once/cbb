import { ElementRule, Rule, TextRule } from './rule'
import { IElement, IText } from './tree'

export interface IRunner {
  // elementRules: Set<ElementRule>
  // textRules: Set<TextRule>

  // defaultElementRule?: ElementRule
  // defaultTextRule: TextRule

  // add(rule: Rule): void

  run(nodeOrText: Node, parents: Node[], children?: (IElement | IText)[]): IElement[]
  run(nodeOrText: string, parents: Node[]): (IElement | IText)[]
  run(
    nodeOrText: Node | string,
    parents: Node[],
    children?: (IElement | IText)[]
  ): IElement[] | (IElement | IText)[]

  // match(nodeOrText: Node): ElementRule[]
  // match(nodeOrText: string): TextRule[]
  // match(nodeOrText: Node | string): ElementRule[] | TextRule[]
}
