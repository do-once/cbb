import { IParser } from '../../types'

export class Parser implements IParser {
  constructor(private readonly _parser: DOMParser) {}

  static create = () => new Parser(new DOMParser())

  parse = (str: string) => this._parser.parseFromString(str, 'text/html')
}
