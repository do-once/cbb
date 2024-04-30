import { IParser, INode, ITraverser, IElement } from '../types'
import { Parser, Traverser } from './builtin'

type CreateOptions = {
  parser?: IParser
  traverser?: ITraverser
}

export class DoonceDeserializer {
  constructor(private _parser: IParser, private _traverser: ITraverser) {}

  static create = (opts?: CreateOptions) => {
    const parser = opts.parser ?? Parser.create()
    const traverser = opts.traverser ?? Traverser.create()

    const instance = new DoonceDeserializer(parser, traverser)
    return instance
  }

  run = (str: string) => {
    const doc = this._parser.parse(str)
    const ret = this._traverser.run(doc)

    return ret
  }
}
