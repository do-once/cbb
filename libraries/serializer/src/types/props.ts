export interface IProps {
  [k: PropertyKey]: unknown
}

export interface IPlainTextProps extends IProps {
  bold?: 0 | 1
  italic?: 0 | 1
}

type TableBorder = {
  sz?: number | string
  color?: string
  style?: string
}

export type TableBorders = {
  top?: TableBorder
  right?: TableBorder
  bottom?: TableBorder
  left?: TableBorder
}

export interface ITableProps extends IProps {
  borders?: TableBorders
  layout?: 'fixed' | 'auto'
  width?: number | string
}

export interface ITableTrProps extends IProps {}

export interface ITableTcProps extends IProps {
  borders?: TableBorders
  gridSpan?: number
  rowSpan?: number
  vMerge?: 'restart' | 'continue'
}
