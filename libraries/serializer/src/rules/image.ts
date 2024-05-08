import { ElementRule, IElement, IText, RuleTypeEnum } from '../types'

export type ImageProps = {
  src: string
  alt?: string
  width?: number
  height?: number
}

const NAME = 'ImageRule'
const TYPE = 'Image'

export class ImageRule extends ElementRule<ImageProps> {
  name: string = NAME
  type: RuleTypeEnum = RuleTypeEnum.ELEMENT
  test(node: Node): boolean {
    return ['IMG'].includes(node.nodeName)
  }
  run(node: Node, parents: Node[], children: (IElement<{}> | IText<{}>)[]): IElement<ImageProps> {
    return {
      type: TYPE,
      props: {
        src: ''
      },
      children
    }
  }
}
