import { useCallback, useRef } from 'react'

/**
 * ## Debounce
 *
 * ### debounce
 *
 * 將原先 fn 天接 debounce 效果後，作為新 fnDebounced 函式後返回。能直接使用在 useEffect 中。
 *
 * 可自行傳入 Timer 來使用，利於後續清除計時器。
 *
 */
export function debounce<T, U extends any[]>(
  fn: (...args: U) => T,
  ms: number,
  args: U,
  timeout: NodeJS.Timeout | null = null // 可選擇從做為參數傳入
): () => void {
  return function () {
    if (!!timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      fn(...args)
    }, ms)
  }
}

/**
 * ## useDebounceFn
 *
*
 * 返回一陣列，包含 fnDebounced 與 clear 函式。
 *
 * fnDebounced 為原先 fn 添加 debounce 效果，並使用 React.useCallback 包裹，能作為回調函式使用。clear 函式能用來清除計時器。
 *
 * 使用範例:
 * ```
 *  const fn = () => {...}
 *  const [fnDebounced, clear] = useDebounceFn(fn, 1000, [])
 *
 *  useEffect(()=>{
 *    fnDebounced();

 *    return () => {
 *      clear()
 *    }
 *  }, [])
 * ```
 */
export function useDebounceFn<T, U extends any[]>(
  fn: (...args: U) => T,
  ms: number,
  args: U // 同時作為傳入fn的參數與依賴項目
): [() => void, () => void] {
  const timer = useRef<NodeJS.Timeout | null>(null)
  const fnDebounced = useCallback(debounce(fn, ms, args, timer.current), args)
  const clear = useCallback(() => {
    if (!!timer.current) {
      clearTimeout(timer.current)
    }
  }, args)

  return [fnDebounced, clear]
}
