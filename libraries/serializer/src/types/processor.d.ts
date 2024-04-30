import { INode } from './tree'

export interface IPreProcessor {
  run(str: string): string
}

export interface IPostPorcessor {
  run(nodes: INode[]): INode[]
}
