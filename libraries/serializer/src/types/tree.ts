import { IProps } from './props'

export interface IElement<P extends IProps = {}> {
  type: string
  props: P
  children: IElement[] | (IElement | IText)[]
}

export interface IText<P extends IProps = {}> {
  type: 'text'
  props: P
  text: string
}
