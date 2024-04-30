export interface IElement<P extends { [k: PropertyKey]: any } = {}> {
  type: string
  props: P
  children: IElement[] | (IElement | IText)[]
}

export interface IText<P extends { [k: PropertyKey]: any } = {}> {
  type: 'text'
  props: P
  text: string
}

export type INode = IElement | IText
