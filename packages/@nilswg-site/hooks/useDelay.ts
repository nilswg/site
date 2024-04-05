import { useCallback, useEffect, useRef } from 'react'

/**
 * ## Delay
 *
 * ### useDelayEffect
 *
 * 產生具延時效果的 useEffect
 *
 */
export function useDelayEffect<T, U extends any[]>(
  fn: (...args: U) => T,
  ms: number,
  args: U // 同時作為傳入fn的參數與依賴項目
) {
  useEffect(() => {
    const timer: NodeJS.Timeout = setTimeout(() => {
      fn(...args)
    }, ms)

    return () => {
      clearTimeout(timer)
    }
  }, args)
}

/**
 * ### useDelayFn
 *
 * 會返回一陣列，含添加延時效果的新 fnDelayed 與 clear 方法，於組件卸載時使用，回收計時器。新產生的 fnDelayed 是原先 fn 添加延時效果，並用 useCallBack 來包裹。
 *
 * 使用範例:
 * ```
 *  const fn = () => {...}
 *  const [fnDelayed, clear] = useDelayFn(fn, 1000, [])
 *
 *  useEffect(()=>{
 *    fnDelayed();

 *    return () => {
 *      clear()
 *    }
 *  }, [])
 * ```
 */
export function useDelayFn<T, U extends any[]>(
  fn: (...args: U) => T,
  ms: number,
  args: U // 同時作為傳入fn的參數與依賴項目
): [() => void, () => void] {
  const timer = useRef<NodeJS.Timeout | null>(null)

  const callBack = useCallback(() => {
    timer.current = setTimeout(() => {
      fn(...args)
    }, ms)
  }, args)

  const clear = useCallback(() => {
    if (timer.current) {
      clearTimeout(timer.current)
    }
  }, args)

  return [callBack, clear]
}
