/**
 * @author GuangHui
 * @description DoonceFIFOCache 主体程序
 */

/** 实现FIFO的cache */
export class DoonceFIFOCache<K, V> extends Map<K, V> {
  private maxSize: number

  constructor(maxSize: number) {
    super()
    this.maxSize = maxSize
  }

  set(key: K, value: V) {
    // 如果缓存已满，根据算法删除最早的缓存项
    if (this.size >= this.maxSize) this.delete(this.keys().next().value)

    super.set(key, value)
    return this
  }

  /** 针对无副作用方法的结果进行缓存 */
  static forFn = <T extends (...args: any[]) => any>(
    func: T,
    key?: (...args: Parameters<T>) => string,
    size: number = 10
  ) => {
    const _cache = new DoonceFIFOCache<string, ReturnType<T>>(size)

    const wrappedFn = (...args: Parameters<T>): ReturnType<T> => {
      const _key = typeof key === 'function' ? key(...args) : `${JSON.stringify(args)}`

      if (_cache.get(_key)) return _cache.get(_key)!

      const ret = func(...args)
      console.log('trigger cache calc :>> ', args, ret)
      _cache.set(_key, ret)
      return ret
    }

    return wrappedFn
  }
}
