import { useCallback } from 'react'

/**
 * ## Throttle
 *
 * ### throttle
 *
 * 可以直接使用在 useEffect 中的 throttle 方法。
 *
 * 由於實現非使用 setTimeout，故不需要組件卸載時回收計時器
 *
 * #### 使用範例:
 * ```
 *  const callBack = () => {...}
 *  const callBackThrottled = throttle(callBack, 200, [])
 * ```
 *
 * #### TypeScript 型態檢查，參考 [react-use] - useThrottleFn
 * @url https://github.com/streamich/react-use/blob/master/src/useThrottleFn.ts
 */

export function throttle<T, U extends any[]>(
  fn: (...args: U) => T,
  ms: number,
  args: U
) {
  let lastCallTime: number = Date.now()

  return function () {
    const currentTime = Date.now()
    const elapsedTime = currentTime - lastCallTime
    if (elapsedTime >= ms) {
      lastCallTime = currentTime
      fn(...args)
    }
  }
}

/**
 * ### useThrottleFn
 *
 * 使用 React.useCallback 包裹起來的 throttle 方法，可作為回調函式來使用
 */
export function useThrottleFn<T, U extends any[]>(
  fn: (...args: U) => T,
  ms: number,
  args: U // 同時作為傳入fn的參數與依賴項目
) {
  return useCallback(throttle(fn, ms, args), args)
}
