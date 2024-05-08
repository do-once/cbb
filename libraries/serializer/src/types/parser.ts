export interface IParser {
  parse(str: string, errCb?: (...args: any[]) => any): Document
}
