/** 剔除对象中value为null或undefined的key */
export function removeNullishProperties<T extends { [k: string]: any }>(object: T): Partial<T> {
  const entries = Object.entries(object).map(([key, value]) => {
    if (value instanceof Array) {
      return [key, value.map(v => (v !== null && v !== undefined ? v : undefined))]
    } else if (value !== null && typeof value === 'object') {
      return [key, removeNullishProperties(value)]
    }
    return [key, value]
  })

  return Object.fromEntries(
    entries.filter(([, value]) => value !== null && value !== undefined)
  ) as Partial<T>
}
