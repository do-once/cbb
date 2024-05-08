import { IElement, IText, RuleTypeEnum, TextRule } from '../types'

export type PlainTextProps = {
  bold?: 0 | 1
}

const NAME = 'PlainTextRule'
const TYPE = 'text'

export class PlainTextRule extends TextRule<PlainTextProps> {
  name: string = NAME
  type: RuleTypeEnum = RuleTypeEnum.TEXT
  default = true
  test(text: string): boolean {
    return /.+?/g.test(text)
  }
  run(str: string, parents: Node[]): IElement<PlainTextProps> | IText<PlainTextProps> {
    return {
      type: TYPE,
      props: {},
      text: str
    }
  }
  split(str: string): string[] {
    return [str]
  }
}
