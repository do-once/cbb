import { IElement, IText } from './tree'

export interface IPreProcessor {
  run(str: string): string
}

export interface IPostPorcessor {
  run(nodes: (IElement | IText)[]): (IElement | IText)[]
}
