import { IProps } from './props'
import { IElement, IText } from './tree'

export const enum RuleTypeEnum {
  ELEMENT,
  TEXT
}

export abstract class ElementRule<P extends IProps = {}> {
  abstract name: string
  abstract type: RuleTypeEnum
  abstract test(node: Node): boolean
  abstract run(node: Node, parents: Node[], children: (IElement | IText)[]): IElement<P>

  default = false
}

export abstract class TextRule<P extends IProps = {}> {
  abstract name: string
  abstract type: RuleTypeEnum
  abstract test(text: string): boolean
  abstract run(str: string, parents: Node[]): IElement<P> | IText<P>

  abstract split(str: string): string[]

  default = false
}

export type Rule = ElementRule | TextRule
