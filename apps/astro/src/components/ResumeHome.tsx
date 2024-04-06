import { Image } from './Image'
import { BiEnvelope, BiMap, BiPhone } from 'react-icons/bi'
import ResumeSelfHead from 'public/img/self_head.jpg'

type Props = {
  fontStyles: string
  name: string
  jobTitle: string
  address: string
}

export const ResumeHome: React.FC<Props> = ({
  fontStyles,
  name,
  jobTitle,
  address,
}) => {
  return (
    <section className={`py-6 ${fontStyles}`}>
      <div className="flex flex-col items-center">
        <div className="relative h-[100px] w-[100px] rounded-full">
          <Image
            className="rounded-full object-cover object-center w-full h-full"
            src={ResumeSelfHead}
            alt="self image of resume"
            width={464}
            height={349}
          />
        </div>
        <h1
          id="resume_name"
          className="mt-2 text-center text-xl font-semibold uppercase tracking-widest text-[#403A3A]"
        >
          {name}
        </h1>
        <h3 className="text-[.938rem]">{jobTitle}</h3>
      </div>
      <div className="mt-10 flex flex-col gap-3">
        <span className="inline-flex items-center text-[.875rem] text-[#403A3A]">
          <BiMap className="mr-1 text-[1.2rem]" /> {address}
        </span>
        <span className="inline-flex items-center text-[.875rem] text-[#403A3A]">
          <BiEnvelope className="mr-1 text-[1.2rem]" /> nilsonweng@gmail.com
        </span>
        {process.env.NODE_ENV === 'development' && (
          <span className="inline-flex items-center text-[.875rem] text-[#403A3A]">
            <BiPhone className="mr-1 text-[1.2rem]" /> 0988-572-252
          </span>
        )}
      </div>
    </section>
  )
}
