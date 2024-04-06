import getJobDate from '@/lib/getJobDate'
import { ResumeSectionTitle } from './ResumeSectionTitle'

type Props = {
  textFontStyles:string,
  jobTitleStyles:string,
  jobPositionStyles:string,
  lang:string,
  title: string,
  experiences:Partial<ExperienceProps>[],
}
export const ResumeExperience: React.FC<Props> = ({
  textFontStyles,
  jobTitleStyles,
  jobPositionStyles,
  lang,
  title,
  experiences,
}) => {
  return (
    <section className={`py-6 ${textFontStyles}`}>
    <ResumeSectionTitle text={title} />
    {experiences?.length &&
      experiences.map((x) => (
        <div key={`resume_exp_${x.company}`} className="flex">
          <div className="pr-3">
            <span className="relative mt-1 block h-3 w-3 rounded-full bg-[#707070]"></span>
            <span className="block h-[105%] w-[2px] translate-x-[5px] bg-[#707070]"></span>
          </div>
          <div className="mb-6 grid gap-1">
            <h2
              className={`text-[1rem] ${jobTitleStyles} text-[#403A3A]`}
            >
              {x.jobtitle}
            </h2>
            <h3
              className={`text-[.875rem] ${jobPositionStyles} text-[#403A3A]`}
            >
              {x.jobposition}｜{x.company}
            </h3>
            <span className="text-[.85rem] text-gray-500">
              {getJobDate(x.begintime, lang)} -{' '}
              {getJobDate(x.endtime, lang)}
            </span>
            <span className="text-[.85rem] font-normal tracking-normal text-[#0B0A0A]">
              {x?.texts?.map((text, i) => (
                <p key={i} className={`my-0 flex pl-2`}>
                  <span className="inline-block">-&nbsp;</span>
                  <span className="inline-block" key={i}>
                    {text}
                  </span>
                </p>
              ))}
            </span>
          </div>
        </div>
      ))}
  </section>
  )
}
