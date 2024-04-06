import { Image } from './Image'
import { FlipAnimation } from './FlipAnimation'

type Props = {
  id: string
  img: string
}
const SkillBox = ({ id, img }: Props) => {
  return (
    <FlipAnimation direction={'vertical'}>
      <div className="group flex flex-col items-center justify-between space-y-2 rounded-lg border border-transparent p-4 transition-all duration-300 ease-in-out hover:border-gray-200 hover:shadow-sm sm:p-5">
        <Image
          className="rounded-md transition-transform ease-in-out group-hover:-translate-y-2"
          src={img}
          alt={`skill ${id} image`}
          width={64}
          height={64}
          loading="lazy"
        ></Image>
        <p className="text-center font-play text-lg text-gray-400 opacity-100 transition-colors ease-in-out group-hover:text-gray-200 sm:text-xl">
          {id}
        </p>
      </div>
    </FlipAnimation>
  )
}

export default SkillBox
