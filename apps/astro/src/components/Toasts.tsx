import { useToastsStore } from '@/stores/toasts'
import { useCallback, useEffect, useRef, useState } from 'react'
import { HiOutlineX } from 'react-icons/hi'

const Close = () => (
  <>
    <span id="toast-close" className="sr-only">
      Close
    </span>
    <span className="text-[1.25rem]">
      <HiOutlineX />
    </span>
  </>
)

type ToastType = 'error' | 'warn' | 'info' | 'success'

const getToastContent = (
  type: ToastType,
  text: string,
  onClick: () => void
) => {
  const toastStyles = {
    error: {
      bgColor: 'bg-red-500',
      btnColor:
        'focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-red-800 dark:focus:ring-red-700 dark:focus:ring-offset-red-500',
    },
    warn: {
      bgColor: 'bg-yellow-500',
      btnColor:
        'focus:ring-yellow-500 focus:ring-offset-2 focus:ring-offset-yellow-800 dark:focus:ring-yellow-700 dark:focus:ring-offset-yellow-500',
    },
    info: {
      bgColor: 'bg-blue-500',
      btnColor:
        'focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-blue-800 dark:focus:ring-blue-700 dark:focus:ring-offset-blue-500',
    },
    success: {
      bgColor: 'bg-green-500',
      btnColor:
        'focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-green-800 dark:focus:ring-green-700 dark:focus:ring-offset-green-500',
    },
  }

  const { bgColor, btnColor } = toastStyles[type]

  return (
    <div
      className={`mb-3 ml-3 max-w-xs rounded-md ${bgColor} text-md text-white shadow-lg`}
      role="alert"
    >
      <div className="flex p-4 font-zhtw">
        {text}
        <div className="ml-auto">
          <button
            type="button"
            className={`inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-md text-sm text-white/[.5] transition-all hover:text-white focus:outline-none focus:ring-2 ${btnColor}`}
            onClick={onClick}
          >
            <Close />
          </button>
        </div>
      </div>
    </div>
  )
}

type ToastProps = {
  id: string
  type: ToastType
  text: string
}
const Toast = ({ id, type, text }: ToastProps) => {
  const removeToast = useToastsStore((state) => state.removeToast)
  const [anim, setAnim] = useState('animate-slideInRight animate-duration-300')
  const timeout = useRef<NodeJS.Timeout | null>(null)

  const onClick = useCallback(() => {
    setAnim('animate-fadeOutRight animate-duration-300')
    if (timeout.current !== null) clearTimeout(timeout.current)
    timeout.current = setTimeout(() => removeToast(id), 300)
  }, [removeToast])

  useEffect(() => {
    timeout.current = setTimeout(() => onClick(), 5000)

    return () => {
      if (timeout.current !== null) {
        clearTimeout(timeout.current)
      }
    }
  }, [])

  return (
    <div className={`transition-all ${anim}`}>
      {getToastContent(type, text, onClick)}
    </div>
  )
}

const Toasts = () => {
  const toasts = useToastsStore((state) => state.toasts)
  return (
    <div className="fixed top-20 right-3 z-20 w-[20rem]">
      {toasts.map((e) => (
        <Toast key={e.id} id={e.id} type={e.type} text={e.text} />
      ))}
    </div>
  )
}

export default Toasts
