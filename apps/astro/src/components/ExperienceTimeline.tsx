import { getI18nObjects } from '@nilswg/i18n'
import getJobDate from '@/lib/getJobDate'
import getJobTenure from '@/lib/getJobTenure'
import { useTranslation } from './useI18n'
import { ExperienceTimelineItem } from './ExperienceTimelineItem'

export const ExperienceTimeline: React.FC = () => {
  const home = useTranslation('home')
  const common = useTranslation('common')
  const lang = common.t('lang')
  const fontStyles = common.t('fontStyles')
  const experiences = getI18nObjects<ExperienceProps>(
    home.t,
    'experience-timeline'
  )

  return (
    <div
      className="flex w-full flex-col items-center pl-6 pr-3 md:pl-56"
    >
      <ul
        id="timeline"
        className="list-none border-l-8 border-l-sky-800 pl-8 text-white"
      >
        {experiences.map((e, i) => {
          const jobBeginDate = getJobDate(e?.begintime, lang)
          const jobEndDate = getJobDate(e?.endtime, lang)
          const jobDate = `${jobBeginDate} - ${jobEndDate}`
          const jobTenure = getJobTenure(e?.begintime, e?.endtime, lang)
          const jobDetails = e.texts ?? []
          return (
            <li key={e.id} className="relative my-20">
              <ExperienceTimelineItem
                key={e.id + `_${i}`}
                fontStyles={fontStyles}
                companyName={e.company ?? ''}
                companyIcon={e?.img ?? ''}
                jobDate={jobDate}
                jobTenure={jobTenure}
                jobTitle={e.jobtitle ?? ''}
                jobPosition={e.jobposition ?? ''}
                jobDetails={jobDetails}
              />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
