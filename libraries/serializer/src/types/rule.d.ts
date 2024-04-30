import { INode } from './tree'

export const enum RuleTypeEnum {
  ELEMENT,
  RICHTEXT,
  TEXT
}

export abstract class Rule {
  abstract name: string
  abstract type: RuleTypeEnum
  abstract run(): INode
}

export abstract class ElementRule extends Rule {
  abstract test(node: Node): boolean
}

export abstract class TextRule extends Rule {
  abstract test(text: string): boolean
}

export abstract class RichTextRule extends Rule {
  abstract test(text: string): boolean
  abstract split(str: string): string[]
}
