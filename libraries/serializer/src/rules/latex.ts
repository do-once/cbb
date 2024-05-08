import { IElement, IText, RuleTypeEnum, TextRule } from '../types'

export type LatexProps = {
  raw: string
  value: string
}

const NAME = 'LatexRule'
const TYPE = 'latex'

const LATEX_REG = /\\\((.+?)\\\)/
const REG_LATEX_SPLIT = /(\\\(.+?\\\))/

export class LatexRule extends TextRule<LatexProps> {
  name: string = NAME
  type: RuleTypeEnum = RuleTypeEnum.TEXT

  test(text: string): boolean {
    return LATEX_REG.test(text)
  }
  run(str: string, parents: Node[]): IElement<LatexProps> {
    return {
      type: TYPE,
      props: {
        raw: str,
        value: LATEX_REG.exec(str)?.[1] || ''
      },
      children: []
    }
  }
  split(str: string): string[] {
    return str.split(REG_LATEX_SPLIT)
  }
}
