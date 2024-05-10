import { IText, PlainTextProps, RuleTypeEnum, TextRule } from '../types'
import { PlainTextPropsExtracter } from './extracter'

const NAME = 'PlainTextRule'
const TYPE = 'text'

export class PlainTextRule extends TextRule<PlainTextProps> {
  name: string = NAME
  type: RuleTypeEnum = RuleTypeEnum.TEXT
  test(text: string): boolean {
    return /.+?/g.test(text)
  }
  run(str: string, parents: Node[]): IText<PlainTextProps> {
    return {
      type: TYPE,
      props: new PlainTextPropsExtracter().extract(str, parents),
      text: str
    }
  }
  split(str: string): string[] {
    return [str]
  }
}
