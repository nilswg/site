import { useEffect, useRef } from 'react'

type IntersectionLineProps = {
  fn: (observer: IntersectionObserver, entry: IntersectionObserverEntry) => void
  visible?: boolean
  position: string
  options?: IntersectionObserverInit
}

export const IntersectionLine: React.FC<IntersectionLineProps> = ({
  fn,
  visible = false,
  position,
  options,
}) => {
  const ref = useRef<HTMLDivElement | null>(null)

  /**
   * IntersectionObserver 是一個 Web API，無法直接使用在SSR中，因此，須在 useEffect 中創建 IntersectionObserver，確保元素已經被掛載到 DOM 上，否則，發生錯誤。
   */
  useEffect(() => {
    if (!ref?.current) return
    const observer: IntersectionObserver = new IntersectionObserver(
      ([entry]) => {
        fn(observer, entry)
      },
      options
    )

    observer.observe(ref.current)

    return () => {
      if (!ref?.current) return
      observer.unobserve(ref.current)
      observer.disconnect()
    }
  }, [ref])

  return (
    <div
      className={`
        relative ${position}
        ${
          visible &&
          `before:absolute before:z-10 before:w-full before:border before:border-red-600 before:content-['']`
        }
      `}
      ref={ref}
    ></div>
  )
}
