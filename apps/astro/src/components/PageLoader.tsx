import { memo, useEffect, useState } from 'react'
import { IoMdRocket } from 'react-icons/io'

const PageLoader = () => {
  /**
   * 檢查是否已經載入完畢。
   */
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(false)
  }, [])

  /**
   * animation-delay: loading 畫面的持續時間。(可根據實際狀況調整)
   * animate-duration: loading 畫面動畫從有到無的切換時間。(應該固定 1s)
   */
  return (
    <div
      id="pageloader"
      className={`
        fixed top-0 flex h-screen w-full items-center justify-center bg-black
        ${!isLoading && 'animate-fadeOut animate-duration-[750ms] animate-delay-[250ms]'}
      `}
    >
      <div className="relative h-[8rem] w-[8rem] sm:h-[16rem] sm:w-[16rem]">
        <Dots />
        <FlyingRocket />
      </div>
    </div>
  )
}

const dotColor = 'bg-sky-400'
const rocketColor = 'text-sky-400'

type DotProps = {
  index: number
}

const Dots = memo(() => {
  return (
    <>
      {Array(20)
        .fill(0)
        .map((_, i) => (
          <Dot key={`dot_${i}`} index={i} />
        ))}
    </>
  )
})

const Dot = ({ index }: DotProps) => (
  <div className={`absolute inset-0 h-full w-full`} style={{ transform: `rotate(${-10 + index * 18}deg)` }}>
    <span
      className={`absolute inset-0 h-[1rem] w-[1rem] scale-0 animate-[rocketdot_2s_linear_infinite] rounded-full ${dotColor} sm:h-[2rem] sm:w-[2rem]`}
      style={{ animationDelay: `${index / 10}s` }}
    ></span>
  </div>
)

const FlyingRocket = () => {
  return (
    <div className={`absolute inset-0 h-full w-full animate-[rotating_2s_linear_infinite] text-[3rem] sm:text-[7rem] ${rocketColor}`}>
      <IoMdRocket className="relative -left-[0.8rem] -top-[0.8rem] rotate-45 sm:-left-[2rem] sm:-top-[2rem]" />
    </div>
  )
}

export default PageLoader
