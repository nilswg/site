import { Image } from './Image'
import { useCallback, useState } from 'react'
import { ExperienceDetails, ExperienceDetailsProps } from './ExperienceDetails'

type Props = {
  companyName: string
  companyIcon: string
  jobDate: string
  jobTenure: string
  jobTitle: string
  jobPosition: string
} & ExperienceDetailsProps

export const ExperienceTimelineItem: React.FC<Props> = ({
  fontStyles,
  companyName,
  companyIcon,
  jobDate,
  jobTenure,
  jobTitle,
  jobPosition,
  jobDetails,
}) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = useCallback(() => setOpen((s) => !s), [setOpen])

  return (
    <>
      <div
        id="circle"
        className={`
          absolute top-[50%] -ml-[3.55rem] h-10 w-10 translate-y-[-50%] rounded-full
          ${open ? 'border-2 border-sky-400' : 'border-[5px] border-sky-800'}
          bg-myblack transition-all md:-ml-[3.6rem]
        `}
      >
        <Image
          className="rounded-full"
          src={companyIcon}
          alt={`image of ${companyName}`}
          height={60}
          width={60}
        />
      </div>
      <p
        id="date"
        className={`
          pointer-events-none absolute top-[-3rem] cursor-none
          ${fontStyles} text-base tracking-wider
          ${open ? 'text-sky-300' : 'text-sky-600'}
          transition-all md:absolute md:top-[50%] md:-left-[18rem] md:-mt-6 md:w-[13rem] md:px-0 md:text-right
        `}
      >
        {jobDate} <br /> {jobTenure}
      </p>
      <div
        className={`experience-box ${open ? 'open' : ''}`}
        onClick={toggleOpen}
      >
        <h1
          id="company"
          className={`pointer-events-none mt-1 px-3 font-russon text-xl transition-transform duration-200 sm:text-xl`}
        >
          {jobTitle}
        </h1>
        <h2
          id="job-title"
          className={`pointer-events-none mt-2 px-3 font-play text-base text-white transition-all duration-[0.3s] xs:text-base sm:text-lg md:mt-3`}
        >
          {companyName}, {jobPosition}
        </h2>
        <ExperienceDetails fontStyles={fontStyles} jobDetails={jobDetails} />
      </div>
    </>
  )
}
