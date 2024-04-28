/**
 * @author GuangHui
 * @description DoonceLRUCache 主体程序
 */

/** 实现LRU的cache */
export class DoonceLRUCache<K, V> extends Map<K, V> {
  /** 链表 */
  private _usageOrder: K[] = []
  /** 容量 */
  private _capacity: number

  constructor(_capacity: number) {
    super()
    this._capacity = _capacity
  }

  get = (key: K) => {
    if (super.has(key)) {
      this._updateUsageOrder(key)
    }

    return super.get(key)
  }

  set = (key: K, val: V): this => {
    if (super.has(key)) {
      /** 缓存已存在该key，则更新值和访问顺序 */
      super.set(key, val)
      this._updateUsageOrder(key)
    } else {
      if (this.size >= this._capacity) {
        /** 超过容量，删掉最久未使用的键 */
        const oldestKey = this._usageOrder.shift()
        if (oldestKey !== void 0) {
          super.delete(oldestKey)
        }
      } else {
        /** 插入新键值对，并更新访问顺序 */
        super.set(key, val)
        this._usageOrder.push(key)
      }
    }

    return this
  }

  /** 针对无副作用方法的结果进行缓存 */
  static forFn = <T extends (...args: any[]) => any>(
    func: T,
    key?: (...args: Parameters<T>) => string,
    capacity: number = 10
  ) => {
    const _cache = new LRUCache<string, ReturnType<T>>(capacity)

    const wrappedFn = (...args: Parameters<T>): ReturnType<T> => {
      const _key = typeof key === 'function' ? key(...args) : `${JSON.stringify(args)}`

      if (_cache.get(_key)) return _cache.get(_key)!

      const ret = func(...args)
      console.log('trigger LRUCache calc :>> ', args, ret)
      _cache.set(_key, ret)
      return ret
    }

    return wrappedFn
  }

  private _updateUsageOrder = (key: K): void => {
    /** 移动指定key到链表头 */
    const idx = this._usageOrder.indexOf(key)
    if (idx !== -1) {
      this._usageOrder.splice(idx, 1)
      this._usageOrder.push(key)
    }
  }
}
