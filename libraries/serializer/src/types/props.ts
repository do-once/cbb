export interface IProps {
  [k: PropertyKey]: unknown
}

export interface PlainTextProps extends IProps {
  bold?: 0 | 1
  italic?: 0 | 1
}
